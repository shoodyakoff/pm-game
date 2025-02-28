import type { ReactElement } from 'react';
import { mockCharacters } from './character-mocks';
import { GameState, LevelResult, Character, InventoryItem } from '../../types/game';

export const mockGameState: GameState = {
  step: 'level1',
  character: mockCharacters[0],
  inventory: {
    hat: null,
    shirt: null,
    pants: null,
    transport: null
  },
  progress: {
    level1: {
      selectedProduct: {
        id: 'test-product',
        title: 'Test Product',
        description: 'Test Description',
        image: '/products/test.png',
        features: ['Feature 1']
      },
      completed: true,
      score: 100,
      analysis: {
        audience: 'Test audience',
        competitors: 'Test competitors'
      },
      items: []
    },
    level2: {
      selectedProduct: {
        id: 'test-product-2',
        title: 'Test Product 2',
        description: 'Test Description 2',
        image: '/products/test2.png',
        features: ['Feature 2']
      },
      completed: false,
      score: 0,
      analysis: {
        audience: '',
        competitors: ''
      },
      items: []
    },
    level3: {
      selectedProduct: {
        id: 'test-product-3',
        title: 'Test Product 3',
        description: 'Test Description 3',
        image: '/products/test3.png',
        features: ['Feature 3']
      },
      completed: false,
      score: 0,
      analysis: {
        audience: '',
        competitors: ''
      },
      items: []
    }
  }
};

interface MockComponentProps {
  Level1Props: {
    onComplete: (result: LevelResult) => void;
    character: Character;
    inventory: GameState['inventory'];
    onBack: () => void;
  };
  CharacterSelectionProps: {
    onSelect: (char: Character & { customName: string }) => void;
  };
}

export const mockComponents = {
  LevelMap: () => 'Level Map',
  Level1: ({ onComplete }: MockComponentProps['Level1Props']) => {
    onComplete({
      selectedProduct: {
        id: 'test-product',
        title: 'Test Product',
        description: 'Test Description',
        image: '/products/test.png',
        features: ['Feature 1']
      },
      completed: true,
      score: 100,
      analysis: {
        audience: 'Test audience',
        competitors: 'Test competitors'
      }
    });
    return 'Level 1';
  },
  CharacterSelection: ({ onSelect }: MockComponentProps['CharacterSelectionProps']) => 'Character Selection',
  CharacterEquipment: () => 'Character Equipment'
};

export const items = {
  hat: { 
    id: 'hat',
    image: "/items/hat_startup.png", 
    title: "Шапка стартапера", 
    category: 'hat',
    type: 'ITEM'
  },
  shirt: { 
    id: 'shirt',
    image: "/items/shirt_unicorn.png", 
    title: "Кольчуга менеджера", 
    category: 'shirt',
    type: 'ITEM'
  },
  pants: { 
    id: 'pants',
    image: "/items/male.png", 
    title: "Оружие", 
    category: 'pants',
    type: 'ITEM'
  },
  transport: { 
    id: 'transport',
    image: "/items/scooter_electric.png", 
    title: "Электроягуар", 
    category: 'transport',
    type: 'ITEM'
  }
}; 