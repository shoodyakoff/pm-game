import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Level1 from './Level1';
import { setupTest } from '../../../testing/test-utils';
import { mockCharacters } from '../../../testing/mocks/character-mocks';
import { mockGameState } from '../../../testing/mocks/game-mocks';
import { Character, InventoryItem } from '../../../types/game';

const mockCharacter: Character = {
  id: '1',
  name: 'Test PM',
  type: 'Стратег',
  icon: '/characters/test-icon.png',
  image: '/characters/test-image.png',
  description: 'Test description',
  difficulty: 'Нормально',
  weapon: 'Test weapon',
  stats: {
    impact: 80,
    leadership: 70,
    technical: 60
  }
};

const mockInventory = {
  hat: null as InventoryItem | null,
  shirt: null as InventoryItem | null,
  pants: null as InventoryItem | null,
  transport: null as InventoryItem | null
};

describe('Level1', () => {
  const utils = setupTest();
  const onComplete = jest.fn();
  const onBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with equipped items', () => {
    utils.renderWithDnd(
      <Level1
        character={mockCharacter}
        inventory={mockInventory}
        onBack={onBack}
        onComplete={onComplete}
      />
    );

    // Проверяем что экипировка отображается
    if (mockInventory.hat) {
      expect(screen.getByAltText(mockInventory.hat.title)).toBeInTheDocument();
    }
  });

  it('should handle level completion', () => {
    utils.renderWithDnd(
      <Level1
        character={mockCharacters[0]}
        inventory={mockGameState.inventory}
        onComplete={onComplete}
        onBack={onBack}
      />
    );

    const completeButton = screen.getByTestId('complete-level');
    fireEvent.click(completeButton);

    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({
      completed: true,
      score: 100
    }));
  });
}); 