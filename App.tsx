
import React, { useState, useCallback, useMemo } from 'react';
import { SpecialAttack, ConventionalOrder, Allocation, StarBid, CombatResult, CombatRound } from './types';
import { SpecialAttackSection } from './components/SpecialAttackSection';
import { OrderSection } from './components/OrderSection';
import { OrderReport } from './components/OrderReport';
import { AllocationSection } from './components/AllocationSection';
import { AllocationReport } from './components/AllocationReport';
import { StarSection } from './components/StarSection';
import { StarReport } from './components/StarReport';
import { CombatSection } from './components/CombatSection';
import { CombatReport } from './components/CombatReport';

type Tab = 'CARTAS' | 'ALOCACAO' | 'COMANDO' | 'COMBATE';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('CARTAS');
  
  const [reportsVisibility, setReportsVisibility] = useState<Record<Tab, boolean>>({
    CARTAS: false,
    ALOCACAO: false,
    COMANDO: false,
    COMBATE: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ESTADOS ---

  const [specialAttack, setSpecialAttack] = useState<SpecialAttack>({
    card: '', target: '', origin: '', armyCount: '', destination: '',
  });

  const [orders, setOrders] = useState<ConventionalOrder[]>([
    { origin: '', armyCount: '', destination: '' },
    { origin: '', armyCount: '', destination: '' },
    { origin: '', armyCount: '', destination: '' },
    { origin: '', armyCount: '', destination: '' },
    { origin: '', armyCount: '', destination: '' },
  ]);

  const [validSubmission, setValidSubmission] = useState<{
    special: SpecialAttack | null;
    conventional: ConventionalOrder[];
  } | null>(null);

  const [allocations, setAllocations] = useState<Allocation[]>(
    Array(10).fill(null).map(() => ({ territory: '', armyCount: '' }))
  );
  const [validAllocations, setValidAllocations] = useState<Allocation[]>([]);

  const [starBids, setStarBids] = useState<StarBid[]>(
    Array.from({ length: 5 }, (_, i) => ({ stars: i + 1, amount: '' }))
  );
  const [validStarBids, setValidStarBids] = useState<StarBid[]>([]);

  const [combatInput, setCombatInput] = useState<{attacker: number | ""; defender: number | ""}>({
    attacker: 1, defender: 1
  });
  const [combatResult, setCombatResult] = useState<CombatResult | null>(null);

  const isGeneralActive = useMemo(() => specialAttack.card === 'sc9', [specialAttack.card]);

  const totalArmiesToAllocate = useMemo(() => {
    return allocations.reduce((sum, curr) => {
      const count = curr.armyCount === '' ? 0 : Number(curr.armyCount);
      return sum + count;
    }, 0);
  }, [allocations]);

  // Cálculo da probabilidade de vitória
  const winProbability = useMemo(() => {
    const atk = typeof combatInput.attacker === 'number' ? combatInput.attacker : 0;
    const def = typeof combatInput.defender === 'number' ? combatInput.defender : 0;
    if (atk === 0 && def === 0) return 0;
    return Math.floor((atk / (atk + def)) * 100);
  }, [combatInput.attacker, combatInput.defender]);

  const setTabReportVisible = (tab: Tab, visible: boolean) => {
    setReportsVisibility(prev => ({ ...prev, [tab]: visible }));
  };
  
    // Sound assets (use new URL to get proper asset path with Vite)
    const cornetaUrl = new URL('./components/Sounds/cornetaEdit.mp3', import.meta.url).href;
    const marchUrl = new URL('./components/Sounds/marchEdit.mp3', import.meta.url).href;
    const gritoUrl = new URL('./components/Sounds/grito.mp3', import.meta.url).href;
    const soundWarUrl = new URL('./components/Sounds/soundWarEdit.mp3', import.meta.url).href;
  
    const playSound = (src: string) => {
      try {
        const audio = new Audio(src);
        audio.play().catch(() => {});
      } catch (e) {
        // ignore
      }
    };

    const handleSendOrders = useCallback(() => {
      const activeOrdersPool = isGeneralActive ? orders : orders.slice(0, 3);
      const validOrders = activeOrdersPool.filter(o => o.origin !== '' && o.destination !== '' && o.armyCount !== '');
      setValidSubmission({ special: specialAttack.card !== '' ? specialAttack : null, conventional: validOrders });
      playSound(gritoUrl);
      setTabReportVisible('COMANDO', true);
    }, [orders, specialAttack, isGeneralActive, gritoUrl]);


  const handleSendAllocations = useCallback(() => {
    const filtered = allocations.filter(a => a.territory !== '' && a.armyCount !== '');
    setValidAllocations(filtered);
    playSound(marchUrl);
    setTabReportVisible('ALOCACAO', true);
  }, [allocations, marchUrl]);


  const handleSendStarBids = useCallback(() => {
    setValidStarBids(starBids.map(b => ({ ...b, amount: b.amount === '' ? 0 : b.amount })));
    playSound(cornetaUrl);
    setTabReportVisible('CARTAS', true);
  }, [starBids, cornetaUrl]);


  const handleBatalhar = useCallback(() => {
    const atk = typeof combatInput.attacker === 'number' ? combatInput.attacker : 0;
    const def = typeof combatInput.defender === 'number' ? combatInput.defender : 0;
    if (atk <= 0 || def <= 0) return;

    playSound(soundWarUrl);
    setIsSubmitting(true);

    // Delay de 2 segundos conforme solicitado
    setTimeout(() => {
      let currentAtk = atk;
      let currentDef = def;
      const rounds: CombatRound[] = [];
      const attackerWinChance = Math.floor((currentAtk / (currentAtk + currentDef)) * 100);

      while (currentAtk > 0 && currentDef > 0) {
        const roll = Math.floor(Math.random() * 100) + 1;
        const winner = roll <= attackerWinChance ? 'ATACANTE' : 'DEFENSOR';
        if (winner === 'ATACANTE') currentDef--; else currentAtk--;
        rounds.push({ attacker: currentAtk, defender: currentDef, attackerWinChance, roll, winner });
      }

      setCombatResult({ rounds, winner: currentAtk > 0 ? 'ATACANTE' : 'DEFENSOR', survivors: currentAtk > 0 ? currentAtk : currentDef });
      setTabReportVisible('COMBATE', true);
      setIsSubmitting(false);
    }, 4000);
  }, [combatInput]);

  const handleReset = () => {
    setTabReportVisible(activeTab, false);
    if (activeTab === 'COMANDO') {
      setSpecialAttack({ card: '', target: '', origin: '', armyCount: '', destination: '' });
      setOrders(Array(5).fill(null).map(() => ({ origin: '', armyCount: '', destination: '' })));
    } else if (activeTab === 'ALOCACAO') {
      setAllocations(Array(10).fill(null).map(() => ({ territory: '', armyCount: '' })));
    } else if (activeTab === 'CARTAS') {
      setStarBids(Array.from({ length: 5 }, (_, i) => ({ stars: i + 1, amount: '' })));
    } else if (activeTab === 'COMBATE') {
      setCombatInput({ attacker: 1, defender: 1 });
      setCombatResult(null);
    }
  };

  const showReport = reportsVisibility[activeTab];

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto bg-[#2B2B2B] relative overflow-x-hidden">
      <header className="sticky top-0 z-30 bg-[#2B2B2B] px-6 pt-8 pb-4 flex flex-col items-center gap-6">
        <h1 className="military-font text-3xl font-black tracking-[0.6em] text-[#E5D8B8]">{activeTab}</h1>
        <div className="flex w-full bg-[#1A1A1A] rounded-xl p-1 border border-[#E5D8B8]/10 overflow-x-auto no-scrollbar">
          {(['CARTAS', 'ALOCACAO', 'COMANDO', 'COMBATE'] as Tab[]).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 min-w-[75px] py-2.5 rounded-lg text-[9px] font-black tracking-widest transition-all ${activeTab === tab ? 'bg-[#E5D8B8] text-[#2B2B2B]' : 'text-[#E5D8B8]/40 hover:text-[#E5D8B8]'}`}>
              {tab === 'ALOCACAO' ? 'ALOCAÇÃO' : tab}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-6 pb-40 pt-4 flex flex-col gap-4">
        {showReport ? (
          activeTab === 'COMANDO' ? <OrderReport special={validSubmission?.special || null} conventional={validSubmission?.conventional || []} onBack={handleReset} />
          : activeTab === 'ALOCACAO' ? <AllocationReport allocations={validAllocations} onBack={handleReset} />
          : activeTab === 'CARTAS' ? <StarReport bids={validStarBids} onBack={handleReset} />
          : combatResult && <CombatReport result={combatResult} onBack={handleReset} />
        ) : (
          <div className="flex flex-col gap-4">
            {activeTab === 'CARTAS' && starBids.map((bid, i) => (
              <StarSection key={i} index={i} bid={bid} onUpdate={(v) => {const n=[...starBids]; n[i]=v; setStarBids(n);}} />
            ))}
            {activeTab === 'ALOCACAO' && allocations.map((alloc, i) => (
              <AllocationSection key={i} index={i} allocation={alloc} onUpdate={(v) => {const n=[...allocations]; n[i]=v; setAllocations(n);}} />
            ))}
            {activeTab === 'COMANDO' && (
              <>
                <SpecialAttackSection attack={specialAttack} onUpdate={setSpecialAttack} />
                {(isGeneralActive ? orders : orders.slice(0, 3)).map((order, i) => (
                  <OrderSection key={i} index={i} order={order} onUpdate={(v) => {const n=[...orders]; n[i]=v; setOrders(n);}} />
                ))}
              </>
            )}
            {activeTab === 'COMBATE' && (
              <CombatSection 
                attacker={combatInput.attacker} 
                defender={combatInput.defender} 
                winProbability={winProbability}
                onUpdate={(f, v) => setCombatInput(p => ({...p, [f]: v}))} 
              />
            )}
          </div>
        )}
      </main>

      {!showReport && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#2B2B2B] via-[#2B2B2B]/95 to-transparent pt-12 pb-6 px-6 pointer-events-none">
          <div className="max-w-lg mx-auto pointer-events-auto flex flex-col gap-4">
            {activeTab === 'CARTAS' && (
              <button onClick={handleSendStarBids} className="w-full py-5 rounded-2xl font-black text-base military-font tracking-[0.3em] bg-[#E5D8B8] text-[#2B2B2B] shadow-[0_8px_16px_rgba(0,0,0,0.3)] transform active:scale-95 transition-all border border-black/10">
                ENVIAR APOSTAS
              </button>
            )}
            {activeTab === 'ALOCACAO' && (
              <button onClick={handleSendAllocations} className="w-full py-5 rounded-2xl font-black text-base military-font tracking-[0.2em] bg-[#E5D8B8] text-[#2B2B2B] shadow-[0_8px_16px_rgba(0,0,0,0.3)] transform active:scale-95 transition-all border border-black/10">
                ALOCAR {totalArmiesToAllocate} EXERCITOS
              </button>
            )}
            {activeTab === 'COMANDO' && (
              <button onClick={handleSendOrders} className="w-full py-5 rounded-2xl font-black text-base military-font tracking-[0.3em] bg-[#E5D8B8] text-[#2B2B2B] shadow-[0_8px_16px_rgba(0,0,0,0.3)] transform active:scale-95 transition-all border border-black/10">
                ENVIAR ORDENS
              </button>
            )}
            {activeTab === 'COMBATE' && (
              <button 
                onClick={handleBatalhar} 
                disabled={isSubmitting}
                className="w-full py-5 rounded-2xl font-black text-base military-font tracking-[0.3em] bg-[#E5D8B8] text-[#2B2B2B] shadow-[0_8px_16px_rgba(0,0,0,0.3)] transform active:scale-95 transition-all border border-black/10 disabled:opacity-50"
              >
                {isSubmitting ? 'BATALHANDO...' : 'BATALHAR'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
