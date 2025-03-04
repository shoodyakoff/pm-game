import type { ReactElement } from 'react';
import { GameState, LevelResult } from '../../types/game';
import { Character } from '../../types/character';
import { getCharacterConfig, ITEMS_CONFIG } from '@/config/character-equipment-positions.ts';
import { CharacterConfig } from '../../types/character';

const config = getCharacterConfig('product-lead');

// Создаем промежуточный объект с правильной типизацией
const mockCharacter: Character = {
  id: config.id,
  type: config.type,
  name: config.displayName,
  icon: config.icon,
  image: config.image,
  description: config.description,
  difficulty: config.difficulty,
  weapon: config.weapon,
  stats: {
    impact: config.stats.impact,
    leadership: config.stats.leadership,
    technical: config.stats.technical
  }
};

export const mockGameState: GameState = {
  step: 'map',
  character: {
    id: 'product-lead',
    type: 'product-lead',
    name: 'Product Lead',
    image: '/characters/product-lead-full.png',
    icon: '/characters/product-lead-icon.png',
    description: 'Стратег и визионер. Превращает хаос в структурированный план действий.',
    difficulty: "Нормально",
    weapon: 'OKR Dashboard, Roadmap Canvas',
    stats: {
      impact: 90,
      leadership: 85,
      technical: 65
    }
  },
  inventory: {
    hat: null,
    armor: null,
    weapon: null,
    transport: null
  },
  progress: {},
  level: 1
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
    } as LevelResult);
    return 'Level 1';
  },
  CharacterSelection: ({ onSelect }: MockComponentProps['CharacterSelectionProps']) => 'Character Selection',
  CharacterEquipment: () => 'Character Equipment'
};

export const items = ITEMS_CONFIG; 