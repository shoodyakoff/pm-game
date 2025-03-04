import { InventoryItem } from '@/types/inventory';

export const items: InventoryItem[] = [
  // Головные уборы
  {
    id: 'hat_startup',
    title: 'Шапка стартапера',
    description: 'Помогает генерировать идеи и привлекать инвесторов',
    image: '/items/hat_startup.png',
    category: 'head',
    stats: {
      intelligence: 2,
      charisma: 1
    }
  },
  
  // Броня
  {
    id: 'shirt_unicorn',
    title: 'Броня единорога',
    description: 'Защищает от критики и повышает креативность',
    image: '/items/shirt_unicorn.png',
    category: 'body',
    stats: {
      charisma: 2,
      luck: 1
    }
  },
  
  // Оружие
  {
    id: 'sword_decisions',
    title: 'Меч решений',
    description: 'Помогает быстро принимать правильные решения',
    image: '/items/male.png',
    category: 'weapon',
    stats: {
      intelligence: 1,
      energy: 2
    }
  },
  
  // Транспорт
  {
    id: 'scooter_electric',
    title: 'Электрический скутер',
    description: 'Позволяет быстро перемещаться между встречами',
    image: '/items/scooter_electric.png',
    category: 'transport',
    stats: {
      energy: 3
    }
  }
]; 