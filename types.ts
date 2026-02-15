
export interface SpecialAttack {
  card: string;
  target: string;
  origin?: string;
  armyCount?: number | "";
  destination?: string;
}

export interface ConventionalOrder {
  origin: string;
  armyCount: number | "";
  destination: string;
}

export interface Allocation {
  territory: string;
  armyCount: number | "";
}

export interface StarBid {
  stars: number;
  amount: number | "";
}

export interface CombatRound {
  attacker: number;
  defender: number;
  attackerWinChance: number;
  roll: number;
  winner: 'ATACANTE' | 'DEFENSOR';
}

export interface CombatResult {
  rounds: CombatRound[];
  winner: 'ATACANTE' | 'DEFENSOR';
  survivors: number;
}

export interface Territory {
  id: string;
  name: string;
  color: string;
}

export interface SpecialCard {
  id: string;
  name: string;
  description: string;
}
