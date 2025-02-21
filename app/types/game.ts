export interface Character {
  id: string;
  name: string;
  image: string;
  icon: string;
  description: string;
  type: string;
  difficulty: string;
  weapon: string;
  stats: {
    impact: number;
    leadership: number;
    technical: number;
  };
  customName?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface LevelProgress {
  selectedProduct?: Product;
  completed: boolean;
  score?: number;
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

export interface GameState {
  step: 'selection' | 'character' | 'level1' | 'level2';  // Добавляем 'selection'
  character: Character | null;  // Делаем character опциональным
  inventory: Record<ItemCategory, InventoryItem | null>;
  progress: {
    level1?: LevelProgress;
    level2?: LevelProgress;
  };
}