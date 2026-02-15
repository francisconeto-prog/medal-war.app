
import { Territory, SpecialCard } from './types';

const createTerritories = () => {
  const territories: Territory[] = [];
  
  // M1-M9 (Red) - Updated to #C4111C
  for (let i = 1; i <= 9; i++) {
    territories.push({ id: `M${i}`, name: `M${i}`, color: '#C4111C' });
  }
  // R1-R6 (Blue) - Updated to #080EC4
  for (let i = 1; i <= 6; i++) {
    territories.push({ id: `R${i}`, name: `R${i}`, color: '#080EC4' });
  }
  // F1-F6 (Black)
  for (let i = 1; i <= 6; i++) {
    territories.push({ id: `F${i}`, name: `F${i}`, color: '#000000' });
  }
  // S1-S9 (Yellow)
  for (let i = 1; i <= 9; i++) {
    territories.push({ id: `S${i}`, name: `S${i}`, color: '#EAB308' });
  }
  // C1-C3 (Green) - Updated to #178F06
  for (let i = 1; i <= 3; i++) {
    territories.push({ id: `C${i}`, name: `C${i}`, color: '#178F06' });
  }
  // G1-G3 (Grey)
  for (let i = 1; i <= 3; i++) {
    territories.push({ id: `G${i}`, name: `G${i}`, color: '#6B7280' });
  }
  
  return territories;
};

export const TERRITORIES: Territory[] = createTerritories();

export const SPECIAL_CARDS: SpecialCard[] = [
  { id: 'sc1', name: 'Drone', description: 'Reconhecimento aéreo tático.' },
  { id: 'sc2', name: 'Tanque', description: 'Poder de fogo blindado pesado.' },
  { id: 'sc3', name: 'Reforço', description: 'Tropas terrestres adicionais.' },
  { id: 'sc4', name: 'Paraquedista', description: 'Desdobramento rápido atrás das linhas.' },
  { id: 'sc5', name: 'Retirada', description: 'Recuo estratégico organizado.' },
  { id: 'sc6', name: 'Bombardeiro', description: 'Ataque aéreo de grande escala.' },
  { id: 'sc7', name: 'Artilharia', description: 'Suporte de fogo de longa distância.' },
  { id: 'sc8', name: 'Destroyer', description: 'Suporte naval de alta potência.' },
  { id: 'sc9', name: 'General', description: 'Bônus de liderança e comando.' },
  { id: 'sc10', name: 'Transportador', description: 'Logística de movimentação de massa.' },
  { id: 'sc11', name: 'Médico', description: 'Recuperação de unidades feridas.' },
  { id: 'sc12', name: 'Espião', description: 'Infiltração e coleta de dados.' },
  { id: 'sc13', name: 'Emboscada', description: 'Ataque surpresa defensivo.' },
  { id: 'sc14', name: 'Sniper', description: 'Eliminação precisa de alvos.' },
  { id: 'sc15', name: 'Bomba', description: 'Destruição massiva de área.' },
];

export const COLORS = {
  bgMain: '#2B2B2B',
  container: '#6E8B3D',
  specialContainer: '#7A4A34',
  field: '#8FAF6A',
  text: '#E5D8B8',
  shadow: '#2B2B2B',
};
