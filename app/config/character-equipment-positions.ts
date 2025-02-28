import { ItemCategory } from '../types/inventory';

interface EquipmentOffset {
  top: string;    // % от высоты персонажа
  left: string;   // % от ширины персонажа
  scale: number;  // масштаб предмета
  zIndex: number;  // Добавим z-index для контроля слоев
}

export const CHARACTER_EQUIPMENT_POSITIONS: Record<string, Record<ItemCategory, EquipmentOffset>> = {
  'tech-pm': {
    hat: {
      top: '-10%',    // Выше головы
      left: '50%',    // По центру
      scale: 1,
      zIndex: 3  // Шлем поверх всего
    },
    armor: {
      top: '0%',
      left: '50%',
      scale: 1,
      zIndex: 2
    },
    weapon: {
      top: '20%',
      left: '80%',
      scale: 1,
      zIndex: 4
    },
    transport: {
      top: '50%',
      left: '20%',
      scale: 1,
      zIndex: 1
    }
  },
  'product-lead': {
    hat: {
      top: '-5%',     // Немного выше головы
      left: '50%',    // По центру
      scale: 0.9,      // Чуть меньше масштаб
      zIndex: 3
    },
    armor: {
      top: '0%',
      left: '50%',
      scale: 1,
      zIndex: 2
    },
    weapon: {
      top: '20%',
      left: '80%',
      scale: 1,
      zIndex: 4
    },
    transport: {
      top: '50%',
      left: '20%',
      scale: 1,
      zIndex: 1
    }
  }
}; 