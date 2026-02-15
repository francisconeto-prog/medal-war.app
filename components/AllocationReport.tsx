
import React from 'react';
import { Allocation, Territory } from '../types';
import { TERRITORIES } from '../constants';

interface AllocationReportProps {
  allocations: Allocation[];
  onBack: () => void;
}

export const AllocationReport: React.FC<AllocationReportProps> = ({ allocations, onBack }) => {
  const getTerritory = (id: string) => TERRITORIES.find(t => t.id === id);

  const TerritorySpan = ({ id }: { id: string }) => {
    const t = getTerritory(id);
    if (!t) return <span>{id}</span>;
    return (
      <span 
        className="px-1.5 py-0.5 rounded font-black border border-current"
        style={{ color: t.color }}
      >
        {t.name}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl border-2 border-[#2B2B2B]/10 shadow-2xl">
        <h2 className="military-font text-xl font-black text-center mb-8 tracking-[0.2em] text-[#2B2B2B] border-b border-[#2B2B2B]/10 pb-4">
          RELATÓRIO DE ALOCAÇÃO
        </h2>

        <div className="space-y-4">
          {allocations.map((alloc, idx) => (
            <div key={idx} className="p-2 bg-[#2B2B2B]/5 rounded-lg border-l-4 border-[#6E8B3D]">
              <p className="text-sm font-bold leading-relaxed text-[#2B2B2B]">
                ALOCAÇÃO {idx + 1}: <TerritorySpan id={alloc.territory} /> recebe <span className="text-[#6E8B3D] text-lg mx-1">{alloc.armyCount}</span> exércitos
              </p>
            </div>
          ))}

          {allocations.length === 0 && (
            <p className="text-center text-red-600 military-font text-xs font-bold">NENHUMA ALOCAÇÃO EXECUTADA</p>
          )}
        </div>
      </div>

      <button
        onClick={onBack}
        className="w-full py-4 rounded-xl font-black text-sm military-font tracking-widest border-2 border-[#E5D8B8]/30 text-[#E5D8B8] hover:bg-[#E5D8B8]/10 transition-colors"
      >
        VOLTAR AO COMANDO
      </button>
    </div>
  );
};
