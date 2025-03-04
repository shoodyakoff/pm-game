import { ItemCategory } from './inventory';

export type Difficulty = "Легко" | "Нормально" | "Сложно";

export interface CharacterStats {
  impact: number;    // Влияние на бизнес
  leadership: number; // Лидерские качества
  technical: number;  // Технические навыки
}

export interface Character {
  id: string;
  displayName: string;
  roleTitle: string;
  image: string;
  icon: string;
  type: 'product-lead' | 'ux-visionary' | 'tech-pm' | 'growth-hacker' | 'agile-coach';
  level?: number;
  description?: string;
  difficulty?: Difficulty;
  stats?: CharacterStats;
} 