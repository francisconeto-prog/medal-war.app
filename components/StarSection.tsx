
import React from 'react';
import { StarBid } from '../types';
import { StarIcon } from './Icons';

interface StarSectionProps {
  index: number;
  bid: StarBid;
  onUpdate: (bid: StarBid) => void;
}

export const StarSection: React.FC<StarSectionProps> = ({ index, bid, onUpdate }) => {
  const handleDecrement = () => {
    const current = typeof bid.amount === 'number' ? bid.amount : 0;
    onUpdate({ ...bid, amount: Math.max(0, current - 1) });
  };

  const handleIncrement = () => {
    const current = typeof bid.amount === 'number' ? bid.amount : 0;
    onUpdate({ ...bid, amount: current + 1 });
  };

  return (
    <div className="bg-[#6E8B3D] p-5 rounded-2xl shadow-[0_4px_12px_rgba(43,43,43,0.3)] animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-4">
        {/* Star Column */}
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E5D8B8]/80 ml-1">
            Carta
          </label>
          <div className="flex items-center h-[46px] gap-1 text-[#EAB308]">
            {Array.from({ length: bid.stars }).map((_, i) => (
              <StarIcon key={i} className="w-7 h-7 drop-shadow-sm" />
            ))}
          </div>
        </div>

        {/* Amount Column */}
        <div className="flex flex-col gap-1 w-32">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E5D8B8]/80 ml-1">
            Quantidade
          </label>
          <div className="flex items-center bg-[#8FAF6A] rounded-lg border border-[#2B2B2B]/20 transition-all overflow-hidden h-[46px]">
            <button 
              type="button"
              onClick={handleDecrement}
              className="px-2 h-full text-[#2B2B2B] hover:bg-black/10 active:bg-black/20 font-black text-lg transition-colors select-none"
            >
              -
            </button>

            <input
              type="number"
              placeholder="0"
              value={bid.amount}
              onChange={(e) => {
                const val = e.target.value === "" ? "" : parseInt(e.target.value);
                onUpdate({ ...bid, amount: val });
              }}
              className="w-full bg-transparent h-full text-sm text-[#2B2B2B] font-bold focus:outline-none placeholder:text-[#2B2B2B]/40 text-center"
            />

            <button 
              type="button"
              onClick={handleIncrement}
              className="px-2 h-full text-[#2B2B2B] hover:bg-black/10 active:bg-black/20 font-black text-lg transition-colors select-none"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
