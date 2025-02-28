export interface Character {
  id: string;
  name: string;
  type: string;
  icon: string;
  image: string;
  description: string;
  difficulty: string;
  weapon: string;
  stats: {
    impact: number;
    leadership: number;
    technical: number;
  }
}

export interface Item {
  image: string;
  title: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string; // Добавляем поле для изображения
  features: string[];
}

export interface AnalysisData {
  audience: string;
  competitors: string;
}

export interface LevelResult {
  selectedProduct: any;
  completed: boolean;
  score: number;
  analysis: any;
}

export interface LevelProgress extends LevelResult {
  items: InventoryItem[];
}

export interface LevelReward {
  id: string;
  name: string;
  description: string;
  imagePath: string;
}

export interface Skill {
  icon: string;
  name: string;
  description: string;
}

export interface LevelSummaryProps {
  character: Character;
  levelNumber: number;
  levelTitle: string;
  skills: Skill[];
  results: React.ReactNode;
  reward?: LevelReward;
  onComplete: () => void;
}

export type ItemCategory = 'hat' | 'shirt' | 'pants' | 'transport';

export interface InventoryItem {
  id: string;
  title: string;
  image: string;
  category: ItemCategory;
}

export interface DragItem extends InventoryItem {
  type: string;
}

export type GameStep = 'selection' | 'map' | 'character' | 'level1' | 'level2' | 'level3';

export interface GameState {
  step: GameStep;
  character: Character;
  inventory: EquippedItems;
  progress: {
    level1?: LevelProgress;
    level2?: LevelProgress;
    level3?: LevelProgress;
  };
}

export interface EquippedItems {
  hat: InventoryItem | null;
  shirt: InventoryItem | null;
  pants: InventoryItem | null;
  transport: InventoryItem | null;
}

// ... остальные типы ...