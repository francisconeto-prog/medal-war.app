
import React from 'react';
import { Allocation } from '../types';
import { TERRITORIES } from '../constants';
import { CustomSelect } from './CustomSelect';
import { HelmetIcon, FlagIcon } from './Icons';

interface AllocationSectionProps {
  index: number;
  allocation: Allocation;
  onUpdate: (allocation: Allocation) => void;
}

export const AllocationSection: React.FC<AllocationSectionProps> = ({ index, allocation, onUpdate }) => {
  const handleDecrement = () => {
    const current = typeof allocation.armyCount === 'number' ? allocation.armyCount : 0;
    onUpdate({ ...allocation, armyCount: Math.max(0, current - 1) });
  };

  const handleIncrement = () => {
    const current = typeof allocation.armyCount === 'number' ? allocation.armyCount : 0;
    onUpdate({ ...allocation, armyCount: current + 1 });
  };

  return (
    <div className="bg-[#6E8B3D] p-5 rounded-2xl shadow-[0_4px_12px_rgba(43,43,43,0.3)] animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center mb-4 border-b border-[#2B2B2B]/20 pb-2">
        <h3 className="text-xs font-black tracking-widest military-font text-[#E5D8B8]">
          ALOCAÇÃO {index + 1}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CustomSelect
          label="Território"
          value={allocation.territory}
          onChange={(val) => onUpdate({ ...allocation, territory: val })}
          options={TERRITORIES}
          icon={<FlagIcon className="w-4 h-4" />}
        />

        <div className="flex flex-col gap-1 w-full">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E5D8B8]/80 ml-1">
            Exército
          </label>
          <div className="flex items-center bg-[#8FAF6A] rounded-lg border border-[#2B2B2B]/20 transition-all overflow-hidden h-[46px]">
            <button 
              type="button"
              onClick={handleDecrement}
              className="px-3 h-full text-[#2B2B2B] hover:bg-black/10 active:bg-black/20 font-black text-lg transition-colors select-none"
            >
              -
            </button>

            <input
              type="number"
              placeholder="00"
              value={allocation.armyCount}
              onChange={(e) => {
                const val = e.target.value === "" ? "" : parseInt(e.target.value);
                onUpdate({ ...allocation, armyCount: val });
              }}
              className="w-full bg-transparent h-full text-sm text-[#2B2B2B] font-bold focus:outline-none placeholder:text-[#2B2B2B]/40 text-center"
            />

            <button 
              type="button"
              onClick={handleIncrement}
              className="px-3 h-full text-[#2B2B2B] hover:bg-black/10 active:bg-black/20 font-black text-lg transition-colors select-none"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
