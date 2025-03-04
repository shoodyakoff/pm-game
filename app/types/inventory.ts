// Категории предметов
export type ItemCategory = 'head' | 'body' | 'weapon' | 'transport';

// Интерфейс для предмета инвентаря
export interface InventoryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ItemCategory;
  stats: {
    intelligence?: number;
    charisma?: number;
    energy?: number;
    luck?: number;
  };
  requiredLevel?: number; // Минимальный уровень персонажа для использования предмета
}

// Интерфейс для экипированных предметов
export interface EquippedItems {
  head: InventoryItem | null;
  body: InventoryItem | null;
  weapon: InventoryItem | null;
  transport: InventoryItem | null;
}

export interface DraggableItemProps {
  item: InventoryItem;
  isDisabled?: boolean;
} 