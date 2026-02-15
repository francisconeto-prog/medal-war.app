
import React from 'react';
import { HelmetIcon, SwordIcon, BattleIcon } from './Icons';

interface CombatSectionProps {
  attacker: number | "";
  defender: number | "";
  winProbability: number;
  onUpdate: (field: 'attacker' | 'defender', value: number | "") => void;
}

export const CombatSection: React.FC<CombatSectionProps> = ({ attacker, defender, winProbability, onUpdate }) => {
  const defenderProb = 100 - winProbability;

  const handleDecrement = (field: 'attacker' | 'defender') => {
    const val = field === 'attacker' ? attacker : defender;
    const current = typeof val === 'number' ? val : 0;
    onUpdate(field, Math.max(0, current - 1));
  };

  const handleIncrement = (field: 'attacker' | 'defender') => {
    const val = field === 'attacker' ? attacker : defender;
    const current = typeof val === 'number' ? val : 0;
    onUpdate(field, current + 1);
  };

  const getProbColor = (prob: number) => {
    if (prob > 60) return 'bg-[#178F06] border-white/20 text-white';
    if (prob > 40) return 'bg-[#EAB308] border-black/10 text-[#2B2B2B]';
    return 'bg-[#C4111C] border-white/20 text-white';
  };

  return (
    <div className="flex flex-col space-y-4 animate-in fade-in duration-500">
      {/* Attacker Panel */}
      <div className="bg-[#7A4A34] p-6 rounded-2xl shadow-[0_8px_20px_rgba(43,43,43,0.4)] border border-[#2B2B2B]/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-black military-font text-[#E5D8B8] flex items-center gap-2">
            <SwordIcon className="w-5 h-5" />
            ATACANTE
          </h3>
          <div className={`px-4 py-2 rounded-xl text-xl font-black military-font tracking-widest border transition-colors shadow-lg ${getProbColor(winProbability)}`}>
            {winProbability}%
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E5D8B8]/80 ml-1">
            Contingente Atacante
          </label>
          <div className="flex items-center bg-[#8FAF6A] rounded-lg border border-[#2B2B2B]/20 transition-all overflow-hidden h-16">
            <div className="pl-4 text-[#E5D8B8]">
              <HelmetIcon className="w-6 h-6" />
            </div>
            <button 
              type="button"
              onClick={() => handleDecrement('attacker')}
              className="px-6 h-full text-[#2B2B2B] hover:bg-black/10 active:bg-black/20 font-black text-2xl transition-colors select-none"
            >
              -
            </button>
            <input
              type="number"
              placeholder="00"
              value={attacker}
              onChange={(e) => {
                const val = e.target.value === "" ? "" : parseInt(e.target.value);
                onUpdate('attacker', val);
              }}
              className="w-full bg-transparent h-full text-xl text-[#2B2B2B] font-black focus:outline-none placeholder:text-[#2B2B2B]/40 text-center"
            />
            <button 
              type="button"
              onClick={() => handleIncrement('attacker')}
              className="px-6 h-full text-[#2B2B2B] hover:bg-black/10 active:bg-black/20 font-black text-2xl transition-colors select-none"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* VS Divider */}
      <div className="flex items-center justify-center py-2">
        <div className="h-[2px] flex-1 bg-[#E5D8B8]/10"></div>
        <div className="mx-4 bg-[#2B2B2B] border-2 border-[#E5D8B8]/20 px-4 py-1 rounded-full text-[#E5D8B8] military-font text-xs font-black">
          VERSUS
        </div>
        <div className="h-[2px] flex-1 bg-[#E5D8B8]/10"></div>
      </div>

      {/* Defender Panel */}
      <div className="bg-[#6E8B3D] p-6 rounded-2xl shadow-[0_8px_20px_rgba(43,43,43,0.4)] border border-[#2B2B2B]/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-black military-font text-[#E5D8B8] flex items-center gap-3">
            <BattleIcon className="w-5 h-5" />
            DEFENSOR
          </h3>
          <div className={`px-4 py-2 rounded-xl text-xl font-black military-font tracking-widest border transition-colors shadow-lg ${getProbColor(defenderProb)}`}>
            {defenderProb}%
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E5D8B8]/80 ml-1">
            Contingente Defensor
          </label>
          <div className="flex items-center bg-[#8FAF6A] rounded-lg border border-[#2B2B2B]/20 transition-all overflow-hidden h-16">
            <div className="pl-4 text-[#E5D8B8]">
              <HelmetIcon className="w-6 h-6" />
            </div>
            <button 
              type="button"
              onClick={() => handleDecrement('defender')}
              className="px-6 h-full text-[#2B2B2B] hover:bg-black/10 active:bg-black/20 font-black text-2xl transition-colors select-none"
            >
              -
            </button>
            <input
              type="number"
              placeholder="00"
              value={defender}
              onChange={(e) => {
                const val = e.target.value === "" ? "" : parseInt(e.target.value);
                onUpdate('defender', val);
              }}
              className="w-full bg-transparent h-full text-xl text-[#2B2B2B] font-black focus:outline-none placeholder:text-[#2B2B2B]/40 text-center"
            />
            <button 
              type="button"
              onClick={() => handleIncrement('defender')}
              className="px-6 h-full text-[#2B2B2B] hover:bg-black/10 active:bg-black/20 font-black text-2xl transition-colors select-none"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
