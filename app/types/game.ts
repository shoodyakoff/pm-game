import { ReactNode } from 'react';
import { Character } from './character';
import { ItemCategory, InventoryItem, EquippedItems } from './inventory';

export type Character = Character;

// Диалоговые данные
export interface DialogData {
  steps: DialogStep[];
}

// Базовый предмет
export interface Item {
  image: string;
  title: string;
}

// Продукт
export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

// Данные анализа рынка
export interface AnalysisData {
  audience: string;
  competitors: string;
}

// Результат прохождения уровня
export interface LevelResult {
  completed: boolean;
  score?: number;
  product?: Product;
  analysis?: AnalysisData;
}

// Прогресс по уровню
export interface LevelProgress {
  id: number;
  isCompleted: boolean;
  isAvailable: boolean;
}

// Награда за уровень
export interface LevelReward {
  item?: {
    id: string;
    name: string;
    type: string;
  };
  skills?: string[];
  stats?: {
    intelligence?: number;
    charisma?: number;
    energy?: number;
    luck?: number;
  };
}

// Навык
export interface Skill {
  icon: string;
  name: string;
  description: string;
}

// Пропсы для компонента итогов уровня
export interface LevelSummaryProps {
  character: Character & { customName: string };
  levelNumber: number;
  levelTitle: string;
  skills: Skill[];
  results: ReactNode;
  reward?: LevelReward;
  onComplete: () => void;
}

// Предмет для перетаскивания
export interface DragItem {
  id: string;
  type: string;
  category: ItemCategory;
}

// Шаг игры
export type GameStep = 
  | 'character_selection'
  | 'character_customization'
  | 'character_equipment'
  | 'level_map'
  | 'level';

// Экипированные предметы
export interface EquippedItems {
  head: InventoryItem | null;
  body: InventoryItem | null;
  weapon: InventoryItem | null;
  transport: InventoryItem | null;
}

// Состояние игры
export interface GameState {
  step: GameStep;
  character: (Character & { customName?: string }) | null;
  inventory: EquippedItems;
  selectedLevel: number | null;
  levelProgress?: LevelProgress[];
}

export interface DialogStep {
  speaker: string;
  text: string;
  avatar?: string;
}

// ... остальные типы ...