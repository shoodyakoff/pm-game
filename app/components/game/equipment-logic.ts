import { Character } from '@/types/character';
import { EquippedItems } from '@/types/game';

// Функция для проверки валидности экипировки
export const validateEquipment = (equippedItems: EquippedItems): boolean => {
  // Проверяем, что хотя бы два слота заполнены
  const equippedCount = Object.values(equippedItems).filter(item => item !== null).length;
  return equippedCount >= 2;
};

// Функция для расчета статистики персонажа с учетом экипировки
export const calculateStats = (
  character: Character, 
  equippedItems: EquippedItems
) => {
  // Базовые статы персонажа
  const baseStats = {
    intelligence: 0,
    charisma: 0,
    energy: 0,
    luck: 0
  };
  
  // Добавляем статы от экипировки
  Object.values(equippedItems).forEach(item => {
    if (item && item.stats) {
      Object.entries(item.stats).forEach(([stat, value]) => {
        if (stat in baseStats) {
          baseStats[stat as keyof typeof baseStats] += value;
        }
      });
    }
  });
  
  return baseStats;
}; 