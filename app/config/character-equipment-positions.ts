import { ItemCategory } from '../types/inventory';

interface EquipmentOffset {
  top: string;    // % от высоты персонажа
  left: string;   // % от ширины персонажа
  scale: number;  // масштаб предмета
  zIndex: number; // z-index для контроля слоев
}

// Позиции экипировки для разных типов персонажей
type CharacterEquipmentPositions = Record<string, Record<ItemCategory, EquipmentOffset>>;

const characterEquipmentPositions: CharacterEquipmentPositions = {
  // Позиции для Product Lead
  'product-lead': {
    hat: {
      top: '-10%',
      left: '50%',
      scale: 0.8,
      zIndex: 3
    },
    armor: {
      top: '20%',
      left: '50%',
      scale: 1,
      zIndex: 2
    },
    weapon: {
      top: '30%',
      left: '80%',
      scale: 0.9,
      zIndex: 4
    },
    transport: {
      top: '70%',
      left: '20%',
      scale: 1.2,
      zIndex: 1
    }
  },
  
  // Позиции для UX-визионера
  'ux-visionary': {
    hat: {
      top: '-10%',
      left: '50%',
      scale: 0.8,
      zIndex: 3
    },
    armor: {
      top: '20%',
      left: '50%',
      scale: 1,
      zIndex: 2
    },
    weapon: {
      top: '30%',
      left: '80%',
      scale: 0.9,
      zIndex: 4
    },
    transport: {
      top: '70%',
      left: '20%',
      scale: 1.2,
      zIndex: 1
    }
  },
  
  // Позиции для Tech PM
  'tech-pm': {
    hat: {
      top: '-10%',
      left: '50%',
      scale: 0.8,
      zIndex: 3
    },
    armor: {
      top: '20%',
      left: '50%',
      scale: 1,
      zIndex: 2
    },
    weapon: {
      top: '30%',
      left: '80%',
      scale: 0.9,
      zIndex: 4
    },
    transport: {
      top: '70%',
      left: '20%',
      scale: 1.2,
      zIndex: 1
    }
  },
  
  // Позиции для Growth Hacker
  'growth-hacker': {
    hat: {
      top: '-10%',
      left: '50%',
      scale: 0.8,
      zIndex: 3
    },
    armor: {
      top: '20%',
      left: '50%',
      scale: 1,
      zIndex: 2
    },
    weapon: {
      top: '30%',
      left: '80%',
      scale: 0.9,
      zIndex: 4
    },
    transport: {
      top: '70%',
      left: '20%',
      scale: 1.2,
      zIndex: 1
    }
  },
  
  // Позиции для Agile Coach
  'agile-coach': {
    hat: {
      top: '-10%',
      left: '50%',
      scale: 0.8,
      zIndex: 3
    },
    armor: {
      top: '20%',
      left: '50%',
      scale: 1,
      zIndex: 2
    },
    weapon: {
      top: '30%',
      left: '80%',
      scale: 0.9,
      zIndex: 4
    },
    transport: {
      top: '70%',
      left: '20%',
      scale: 1.2,
      zIndex: 1
    }
  }
};

export default characterEquipmentPositions; 