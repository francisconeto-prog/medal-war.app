
import React from 'react';
import { SpecialAttack, ConventionalOrder, Territory, SpecialCard } from '../types';
import { TERRITORIES, SPECIAL_CARDS } from '../constants';

interface OrderReportProps {
  special: SpecialAttack | null;
  conventional: ConventionalOrder[];
  onBack: () => void;
}

export const OrderReport: React.FC<OrderReportProps> = ({ special, conventional, onBack }) => {
  const getTerritory = (id: string) => TERRITORIES.find(t => t.id === id);
  const getCardName = (id: string) => SPECIAL_CARDS.find(c => c.id === id)?.name || id;

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

  const isGeneral = special?.card === 'sc9';
  const isTransportador = special?.card === 'sc10';
  const isEspiao = special?.card === 'sc12';

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="bg-white p-4 rounded-2xl border-2 border-[#2B2B2B]/10 shadow-2xl">
        <h2 className="military-font text-xl font-black text-center mb-8 tracking-[0.2em] text-[#2B2B2B] border-b border-[#2B2B2B]/10 pb-4">
          RELATÓRIO DE MISSÃO
        </h2>

        <div className="space-y-6">
          {/* Special Attack Line */}
          {special && special.card ? (
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-[#2B2B2B]/40 font-black tracking-widest uppercase">Ordem Especial</span>
              <p className="text-sm font-bold leading-relaxed text-[#2B2B2B]">
                ATAQUE ESPECIAL: <span className="text-[#F97316]">{getCardName(special.card).toUpperCase()}</span>
                {isTransportador && special.origin && special.destination && (
                  <>: <TerritorySpan id={special.origin} /> transporta <span className="text-[#6E8B3D] text-lg mx-1">{special.armyCount}</span> para <TerritorySpan id={special.destination} /></>
                )}
                {!isGeneral && !isTransportador && !isEspiao && special.target && (
                  <> no território <TerritorySpan id={special.target} /></>
                )}
              </p>
            </div>
          ) : null}

          {/* Conventional Orders Lines */}
          {conventional.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-[10px] text-[#2B2B2B]/40 font-black tracking-widest uppercase">Ordens Convencionais</span>
              {conventional.map((order, idx) => (
                <div key={idx} className="p-2 bg-[#2B2B2B]/5 rounded-lg border-l-4 border-[#6E8B3D]">
                  <p className="text-sm font-bold leading-relaxed text-[#2B2B2B]">
                    ORDEM {idx + 1}: <TerritorySpan id={order.origin} /> ataca com <span className="text-[#6E8B3D] text-lg mx-1">{order.armyCount}</span> em <TerritorySpan id={order.destination} />
                  </p>
                </div>
              ))}
            </div>
          )}

          {(!special || !special.card) && conventional.length === 0 && (
            <p className="text-center text-red-600 military-font text-xs font-bold">NENHUMA ORDEM EXECUTADA</p>
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
