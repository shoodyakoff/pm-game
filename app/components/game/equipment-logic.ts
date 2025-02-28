import { InventoryItem, ItemCategory } from '../../types/game';

export const validateEquipment = (equipment: Record<ItemCategory, InventoryItem | null>): boolean => {
  // Минимум 2 предмета должны быть экипированы
  const equippedCount = Object.values(equipment).filter(item => item !== null).length;
  return equippedCount >= 2;
};

export const calculateStats = (equipment: Record<ItemCategory, InventoryItem | null>) => {
  // Базовые характеристики
  return {
    impact: 0,
    leadership: 0,
    technical: 0
  };
}; 