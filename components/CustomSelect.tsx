
import React from 'react';

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { id: string; name: string; color?: string }[];
  icon: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, onChange, options, icon }) => {
  // Localiza a opção selecionada para obter sua cor específica
  const selectedOption = options.find(opt => opt.id === value);
  const selectionColor = selectedOption?.color;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E5D8B8]/80 ml-1">
        {label}
      </label>
      <div className="relative flex items-center bg-[#8FAF6A] rounded-lg border border-[#2B2B2B]/20 focus-within:ring-2 focus-within:ring-[#E5D8B8]/50 transition-all duration-200">
        <div 
          className="pl-3 transition-colors duration-300"
          style={{ color: selectionColor || '#E5D8B8' }}
        >
          {icon}
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ color: selectionColor || '#2B2B2B' }}
          className="w-full bg-transparent py-3.5 pl-2 pr-8 text-sm font-black focus:outline-none appearance-none cursor-pointer transition-colors duration-300"
        >
          <option value="" className="bg-[#8FAF6A] text-[#2B2B2B]">SELECIONAR...</option>
          {options.map((opt) => (
            <option 
              key={opt.id} 
              value={opt.id} 
              style={{ 
                backgroundColor: opt.color || '#8FAF6A', 
                color: '#FFFFFF' 
              }}
              className="font-bold"
            >
              {opt.name.toUpperCase()}
            </option>
          ))}
        </select>
        <div 
          className="absolute right-3 pointer-events-none transition-colors duration-300"
          style={{ color: selectionColor ? `${selectionColor}CC` : '#2B2B2B99' }}
        >
           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
           </svg>
        </div>
      </div>
    </div>
  );
};
