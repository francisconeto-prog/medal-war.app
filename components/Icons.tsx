
import React from 'react';

// Military-style flag icon for "Origem"
export const FlagIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h14.5l-2.5 4 2.5 4H4v9m0-17v17" />
  </svg>
);

// Tactical target icon for "Alvo" and "Destino"
export const TargetIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
    <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v3m0 14v3M2 12h3m14 0h3" />
  </svg>
);

export const SwordIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export const BattleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

// Fanned cards icon (2 cards one behind the other) for "Carta Especial"
export const CardsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect 
      x="8" y="3" 
      width="10" height="14" 
      rx="1.5" 
      strokeWidth={2} 
      transform="rotate(12 12 10)" 
    />
    <rect 
      x="4" y="6" 
      width="10" height="14" 
      rx="1.5" 
      strokeWidth={2} 
      className="fill-current opacity-20"
    />
  </svg>
);

// Tactical soldier's helmet icon for "Exército"
export const HelmetIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 4c-4.418 0-8 3.582-8 8v1.5c0 .5.5 1 1.5 1h13c1 0 1.5-.5 1.5-1V12c0-4.418-3.582-8-8-8z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M4 13.5c0 1.5 1.5 2.5 3 2.5h10c1.5 0 3-1 3-2.5" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={1.5} 
      d="M8 16l1 3h6l1-3" 
    />
  </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
