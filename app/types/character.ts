export interface Character {
  id: string;
  type: string;
  baseImage: string;  // Базовое изображение (без прически)
  hairImage: string;  // Изображение прически
  // ... другие поля
}

export type ItemCategory = 'hat' | 'armor' | 'weapon' | 'transport'; 