
import React from 'react';
import { SpecialAttack } from '../types';
import { SPECIAL_CARDS, TERRITORIES } from '../constants';
import { CustomSelect } from './CustomSelect';
import { CardsIcon, TargetIcon, FlagIcon, HelmetIcon } from './Icons';

interface SpecialAttackSectionProps {
  attack: SpecialAttack;
  onUpdate: (attack: SpecialAttack) => void;
}

export const SpecialAttackSection: React.FC<SpecialAttackSectionProps> = ({ attack, onUpdate }) => {
  const isGeneral = attack.card === 'sc9';
  const isTransportador = attack.card === 'sc10';
  const isEspiao = attack.card === 'sc12';

  const handleDecrement = () => {
    const current = typeof attack.armyCount === 'number' ? attack.armyCount : 0;
    onUpdate({ ...attack, armyCount: Math.max(0, current - 1) });
  };

  const handleIncrement = () => {
    const current = typeof attack.armyCount === 'number' ? attack.armyCount : 0;
    onUpdate({ ...attack, armyCount: current + 1 });
  };

  return (
    <div className="bg-[#7A4A34] p-6 rounded-2xl shadow-[0_8px_20px_rgba(43,43,43,0.4)] border border-[#2B2B2B]/10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-black military-font text-[#E5D8B8] flex items-center gap-3">
          <CardsIcon className="w-5 h-5" />
          ORDEM ESPECIAL
        </h3>
        <span className="text-[10px] bg-[#E5D8B8] px-2.5 py-1 rounded-full text-[#7A4A34] font-black uppercase tracking-widest shadow-sm">
          OPCIONAL
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <CustomSelect
          label="Carta Especial"
          value={attack.card}
          onChange={(val) => onUpdate({ ...attack, card: val })}
          options={SPECIAL_CARDS}
          icon={<CardsIcon className="w-4 h-4" />}
        />

        {/* Hide target for General, Transportador, and Espiao */}
        {!isGeneral && !isTransportador && !isEspiao && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <CustomSelect
              label="Alvo"
              value={attack.target}
              onChange={(val) => onUpdate({ ...attack, target: val })}
              options={TERRITORIES}
              icon={<TargetIcon className="w-4 h-4" />}
            />
          </div>
        )}

        {/* Triple fields for Transportador */}
        {isTransportador && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <CustomSelect
              label="Origem"
              value={attack.origin || ''}
              onChange={(val) => onUpdate({ ...attack, origin: val })}
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
                  value={attack.armyCount}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : parseInt(e.target.value);
                    onUpdate({ ...attack, armyCount: val });
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
              value={attack.destination || ''}
              onChange={(val) => onUpdate({ ...attack, destination: val })}
              options={TERRITORIES}
              icon={<TargetIcon className="w-4 h-4" />}
            />
          </div>
        )}
      </div>
    </div>
  );
};
