import { screen, fireEvent } from '@testing-library/react';
import Game from './Game';
import { saveGameState, loadGameState } from '../../utils/storage';
import { setupTest } from '../../testing/test-utils';
import { mockGameState } from '../../testing/mocks/game-mocks';
import { mockCharacters } from '../../testing/mocks/character-mocks';
import type { GameState } from '../../types/game';

// Мокаем storage
jest.mock('../../utils/storage', () => ({
  saveGameState: jest.fn(),
  loadGameState: jest.fn()
}));

describe('Game Component', () => {
  const utils = setupTest();

  beforeEach(() => {
    (loadGameState as jest.Mock).mockReturnValue(null);
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should render character selection initially', () => {
      utils.renderWithDnd(<Game />);
      expect(screen.getByText('Выберите своего Product Manager')).toBeInTheDocument();
    });

    it('should load saved state on mount', () => {
      utils.renderWithDnd(<Game />);
      expect(loadGameState).toHaveBeenCalled();
    });
  });

  describe('Game Flow', () => {
    it('should handle character selection', () => {
      utils.renderWithDnd(<Game />);
      
      const character = screen.getByText('Product Lead');
      fireEvent.click(character);
      
      const nameInput = screen.getByPlaceholderText('Введите имя персонажа');
      fireEvent.change(nameInput, { target: { value: 'Test PM' } });

      const confirmButton = screen.getByText('Продолжить');
      fireEvent.click(confirmButton);

      expect(saveGameState).toHaveBeenLastCalledWith(expect.objectContaining({
        step: 'map',
        character: expect.objectContaining({
          name: 'Test PM',
          type: 'Стратег'
        })
      }));
    });

    it('should handle level completion', () => {
      (loadGameState as jest.Mock).mockReturnValue({
        step: 'level1',
        character: mockCharacters[0],
        progress: {}
      });

      utils.renderWithDnd(<Game />);

      const completeLevel = screen.getByTestId('complete-level');
      fireEvent.click(completeLevel);

      expect(saveGameState).toHaveBeenCalledWith(expect.objectContaining({
        step: 'map',
        progress: expect.objectContaining({
          level1: expect.objectContaining({
            completed: true
          })
        })
      }));
    });
  });
}); 