import { InventoryItem, ItemCategory } from '../../types/inventory';

// Предметы для категории "hat" (головные уборы)
export const hatItems: InventoryItem[] = [
  {
    id: 'hat_startup',
    title: 'Шапка стартапера',
    description: 'Помогает генерировать идеи и привлекать инвесторов',
    image: '/items/hat_startup.png',
    category: 'hat',
    stats: {
      impact: 10,
      leadership: 5,
      technical: 0
    },
    requiredLevel: 1 // Доступно с 1 уровня
  }
];

// Предметы для категории "armor" (броня/одежда)
export const armorItems: InventoryItem[] = [
  {
    id: 'shirt_unicorn',
    title: 'Футболка с единорогом',
    description: 'Повышает креативность и привлекает внимание',
    image: '/items/shirt_unicorn.png',
    category: 'armor',
    stats: {
      impact: 5,
      leadership: 10,
      technical: 0
    },
    requiredLevel: 2 // Доступно со 2 уровня
  }
];

// Предметы для категории "weapon" (оружие/инструменты)
export const weaponItems: InventoryItem[] = [
  {
    id: 'pants_casual',
    title: 'Повседневные брюки',
    description: 'Удобные брюки для долгих совещаний',
    image: '/items/pants_casual.png',
    category: 'weapon',
    stats: {
      impact: 0,
      leadership: 5,
      technical: 10
    },
    requiredLevel: 2 // Доступно со 2 уровня
  }
];

// Предметы для категории "transport" (транспорт)
export const transportItems: InventoryItem[] = [
  {
    id: 'scooter_electric',
    title: 'Электрический скутер',
    description: 'Позволяет быстро перемещаться между встречами',
    image: '/items/scooter_electric.png',
    category: 'transport',
    stats: {
      impact: 5,
      leadership: 0,
      technical: 10
    },
    requiredLevel: 2 // Доступно со 2 уровня
  }
];

// Все предметы инвентаря
export const allInventoryItems: Record<ItemCategory, InventoryItem[]> = {
  hat: hatItems,
  armor: armorItems,
  weapon: weaponItems,
  transport: transportItems
};

// Функция для получения предметов, доступных на определенном уровне
export const getAvailableItems = (characterLevel: number): Record<ItemCategory, InventoryItem[]> => {
  const result: Record<ItemCategory, InventoryItem[]> = {
    hat: [],
    armor: [],
    weapon: [],
    transport: []
  };
  
  Object.entries(allInventoryItems).forEach(([category, items]) => {
    const categoryKey = category as ItemCategory;
    result[categoryKey] = items.filter(item => item.requiredLevel <= characterLevel);
  });
  
  return result;
}; 