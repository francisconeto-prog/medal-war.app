
import React from 'react';
import { StarBid } from '../types';
import { StarIcon } from './Icons';

interface StarReportProps {
  bids: StarBid[];
  onBack: () => void;
}

export const StarReport: React.FC<StarReportProps> = ({ bids, onBack }) => {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl border-2 border-[#2B2B2B]/10 shadow-2xl">
        <h2 className="military-font text-xl font-black text-center mb-8 tracking-[0.2em] text-[#2B2B2B] border-b border-[#2B2B2B]/10 pb-4">
          RELATÓRIO DE ESTRELAS
        </h2>

        <div className="space-y-4">
          {bids.map((bid, idx) => (
            <div key={idx} className="p-4 bg-[#2B2B2B]/5 rounded-lg border-l-4 border-[#7A4A34] flex justify-between items-center">
              <div className="flex items-center gap-1 text-[#EAB308]">
                {Array.from({ length: bid.stars }).map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5" />
                ))}
              </div>
              <p className="text-xs font-black text-[#2B2B2B]">
                APOSTA: <span className="text-[#7A4A34] text-lg ml-2">{bid.amount || 0}</span> estrelas
              </p>
            </div>
          ))}

          {bids.length === 0 && (
            <p className="text-center text-red-600 military-font text-xs font-bold">NENHUMA APOSTA REALIZADA</p>
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
