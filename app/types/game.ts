import { ReactNode } from 'react';
import { Character as CharacterType } from './character';
import { ItemCategory, InventoryItem, EquippedItems as EquippedItemsType } from './inventory';

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

// Статус уровня
export type LevelStatus = 'locked' | 'available' | 'completed';

// Прогресс по уровням
export interface LevelProgress {
  level1: LevelStatus;
  level2: LevelStatus;
  level3: LevelStatus;
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
  character: CharacterType & { customName: string };
  levelName: string;
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

// Экран игры (новая последовательность)
export type GameScreen = 
  | 'character-selection'
  | 'character-customization'
  | 'level-map'
  | 'character-equipment'
  | 'level1'
  | 'level2'
  | 'level3';

// Шаг игры (устаревший тип, оставлен для обратной совместимости)
export type GameStep = 
  | 'character_selection'
  | 'character_customization'
  | 'character_equipment'
  | 'level_map'
  | 'level';

// Состояние игры
export interface GameState {
  screen: GameScreen;
  step?: GameStep; // Устаревшее поле, оставлено для обратной совместимости
  selectedCharacter: CharacterType | null;
  customCharacter: CharacterType | null;
  character?: (CharacterType & { customName?: string }) | null; // Устаревшее поле, оставлено для обратной совместимости
  equippedItems: EquippedItemsType;
  inventory?: EquippedItemsType; // Устаревшее поле, оставлено для обратной совместимости
  selectedLevel: string | null;
  levelProgress: LevelProgress;
}

export interface DialogStep {
  speaker: string;
  text: string;
  avatar?: string;
}

// ... остальные типы ...