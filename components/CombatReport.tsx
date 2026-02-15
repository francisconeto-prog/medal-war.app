
import React from 'react';
import { CombatResult } from '../types';
import { SwordIcon, BattleIcon } from './Icons';

interface CombatReportProps {
  result: CombatResult;
  onBack: () => void;
}

export const CombatReport: React.FC<CombatReportProps> = ({ result, onBack }) => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20">
      {/* Winner Highlight */}
      <div className={`p-8 rounded-3xl border-4 shadow-2xl flex flex-col items-center text-center gap-4 ${
        result.winner === 'ATACANTE' 
          ? 'bg-[#7A4A34] border-[#E5D8B8]/40' 
          : 'bg-[#6E8B3D] border-[#E5D8B8]/40'
      }`}>
        <div className="bg-[#E5D8B8] p-4 rounded-full shadow-lg">
          {result.winner === 'ATACANTE' ? (
            <SwordIcon className="w-10 h-10 text-[#7A4A34]" />
          ) : (
            <BattleIcon className="w-10 h-10 text-[#6E8B3D]" />
          )}
        </div>
        <div>
          <h2 className="military-font text-3xl font-black text-[#E5D8B8] tracking-[0.2em]">
            VITORIA {result.winner}
          </h2>
          <p className="text-[#E5D8B8]/80 text-sm font-bold mt-2 uppercase tracking-widest">
            Sobreviventes: <span className="text-white text-2xl ml-1">{result.survivors}</span>
          </p>
        </div>
      </div>

      {/* Rounds Log */}
      <div className="bg-white rounded-2xl border-2 border-[#2B2B2B]/10 overflow-hidden shadow-xl">
        <div className="bg-[#1A1A1A] p-4 flex justify-between items-center">
          <h3 className="military-font text-[10px] font-black text-[#E5D8B8] tracking-widest uppercase">
            RELATÓRIO DE COMBATE
          </h3>
          <span className="text-[10px] text-[#E5D8B8]/40 font-bold">{result.rounds.length} ROUNDS</span>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto divide-y divide-[#2B2B2B]/5">
          {result.rounds.map((round, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-[#2B2B2B]/30 uppercase tracking-tighter">Round {idx + 1}</span>
                <div className="flex items-center gap-3">
                  <div className={`text-xs font-bold ${round.winner === 'ATACANTE' ? 'text-[#7A4A34]' : 'text-[#2B2B2B]/40'}`}>
                    ATK: {round.attacker}
                  </div>
                  <div className="w-px h-3 bg-gray-200"></div>
                  <div className={`text-xs font-bold ${round.winner === 'DEFENSOR' ? 'text-[#6E8B3D]' : 'text-[#2B2B2B]/40'}`}>
                    DEF: {round.defender}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[8px] font-black text-[#2B2B2B]/30 uppercase">Chance / Roll</p>
                  <p className="text-[10px] font-bold text-[#2B2B2B]">{round.attackerWinChance}% / {round.roll}</p>
                </div>
                {/* 
                  Vencedor ATACANTE -> Defensor perdeu exército (-1 DEF)
                  Vencedor DEFENSOR -> Atacante perdeu exército (-1 ATA)
                */}
                <div className={`px-3 py-1 rounded-md text-[9px] font-black tracking-tighter shadow-sm ${
                  round.winner === 'ATACANTE' ? 'bg-[#6E8B3D] text-white' : 'bg-[#7A4A34] text-white'
                }`}>
                  {round.winner === 'ATACANTE' ? '-1 DEF' : '-1 ATA'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onBack}
        className="w-full py-5 rounded-2xl font-black text-sm military-font tracking-widest border-2 border-[#E5D8B8]/30 text-[#E5D8B8] hover:bg-[#E5D8B8]/10 transition-all active:scale-95"
      >
        NOVO COMBATE
      </button>
    </div>
  );
};
