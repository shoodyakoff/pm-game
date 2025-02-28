export interface InventoryItem {
  id: string;
  title: string;
  image: string;
  category: ItemCategory;
}

export type ItemCategory = 'hat' | 'armor' | 'weapon' | 'transport'; 