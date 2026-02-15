
import React from 'react';
import { ConventionalOrder } from '../types';
import { TERRITORIES, COLORS } from '../constants';
import { CustomSelect } from './CustomSelect';
import { FlagIcon, TargetIcon, HelmetIcon } from './Icons';

interface OrderSectionProps {
  index: number;
  order: ConventionalOrder;
  onUpdate: (order: ConventionalOrder) => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({ index, order, onUpdate }) => {
  const handleDecrement = () => {
    const current = typeof order.armyCount === 'number' ? order.armyCount : 0;
    onUpdate({ ...order, armyCount: Math.max(0, current - 1) });
  };

  const handleIncrement = () => {
    const current = typeof order.armyCount === 'number' ? order.armyCount : 0;
    onUpdate({ ...order, armyCount: current + 1 });
  };

  return (
    <div className="bg-[#6E8B3D] p-5 rounded-2xl shadow-[0_4px_12px_rgba(43,43,43,0.3)] animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center mb-6 border-b border-[#2B2B2B]/20 pb-3">
        <h3 className="text-base font-black tracking-widest military-font text-[#E5D8B8]">
          ORDEM {index + 1}
        </h3>
      </div>

      <div className="flex flex-col gap-6">
        <CustomSelect
          label="Origem"
          value={order.origin}
          onChange={(val) => onUpdate({ ...order, origin: val })}
          options={TERRITORIES}
          icon={<FlagIcon className="w-4 h-4" />}
        />

        <div className="flex flex-col gap-1 w-full">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E5D8B8]/80 ml-1">
            Exército
          </label>
          <div className="flex items-center bg-[#8FAF6A] rounded-lg border border-[#2B2B2B]/20 focus-within:ring-2 focus-within:ring-[#E5D8B8]/50 transition-all overflow-hidden">
            <div className="pl-3 text-[#E5D8B8]">
              <HelmetIcon className="w-4 h-4" />
            </div>
            
            <button 
              type="button"
              onClick={handleDecrement}
              className="px-4 py-3.5 text-[#2B2B2B] hover:bg-black/10 active:bg-black/20 font-black text-lg transition-colors select-none"
            >
              -
            </button>

            <input
              type="number"
              placeholder="00"
              value={order.armyCount}
              onChange={(e) => {
                const val = e.target.value === "" ? "" : parseInt(e.target.value);
                onUpdate({ ...order, armyCount: val });
              }}
              className="w-full bg-transparent py-3.5 text-sm text-[#2B2B2B] font-bold focus:outline-none placeholder:text-[#2B2B2B]/40 text-center"
            />

            <button 
              type="button"
              onClick={handleIncrement}
              className="px-4 py-3.5 text-[#2B2B2B] hover:bg-black/10 active:bg-black/20 font-black text-lg transition-colors select-none"
            >
              +
            </button>
          </div>
        </div>

        <CustomSelect
          label="Destino"
          value={order.destination}
          onChange={(val) => onUpdate({ ...order, destination: val })}
          options={TERRITORIES}
          icon={<TargetIcon className="w-4 h-4" />}
        />
      </div>
    </div>
  );
};
