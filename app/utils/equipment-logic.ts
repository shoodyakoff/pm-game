import { Character } from '@/types/character';
import { EquippedItems, InventoryItem } from '@/types/inventory';

// Расчет статистики персонажа с учетом экипировки
export const calculateStats = (character: Character & { customName: string }, equippedItems: EquippedItems) => {
  // Базовые статистики персонажа
  const baseStats = {
    intelligence: 5,
    charisma: 5,
    energy: 5,
    luck: 5
  };
  
  // Добавляем бонусы от экипировки
  const equippedItemsArray = Object.values(equippedItems).filter(item => item !== null) as InventoryItem[];
  
  const stats = equippedItemsArray.reduce((acc, item) => {
    return {
      intelligence: acc.intelligence + (item.stats.intelligence || 0),
      charisma: acc.charisma + (item.stats.charisma || 0),
      energy: acc.energy + (item.stats.energy || 0),
      luck: acc.luck + (item.stats.luck || 0)
    };
  }, baseStats);
  
  return stats;
};

// Проверка, можно ли экипировать предмет
export const canEquipItem = (character: Character, item: InventoryItem): boolean => {
  // Проверка на требуемый уровень
  if (item.requiredLevel && (!character.level || character.level < item.requiredLevel)) {
    return false;
  }
  
  return true;
};

// Валидация экипировки
export const validateEquipment = (equippedItems: EquippedItems): boolean => {
  // Здесь можно добавить дополнительные проверки
  return true;
}; 