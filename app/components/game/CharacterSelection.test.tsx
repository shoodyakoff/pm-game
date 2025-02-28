import { screen, fireEvent } from '@testing-library/react';
import CharacterSelection from './CharacterSelection';
import { setupTest } from '../../testing/test-utils';
import { mockCharacters } from '../../testing/mocks/character-mocks';

describe('CharacterSelection', () => {
  const utils = setupTest();

  describe('Rendering', () => {
    it('should render character list', () => {
      utils.renderWithDnd(
        <CharacterSelection onSelect={jest.fn()} />
      );

      expect(screen.getByText('Product Lead')).toBeInTheDocument();
    });

    it('should render character details', () => {
      utils.renderWithDnd(
        <CharacterSelection onSelect={jest.fn()} />
      );

      const character = screen.getByText('Product Lead');
      fireEvent.click(character);

      expect(screen.getByText('Стратег')).toBeInTheDocument();
      expect(screen.getByText('Нормально')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('should handle character selection', () => {
      const onSelect = jest.fn();
      utils.renderWithDnd(
        <CharacterSelection 
          onSelect={onSelect}
        />
      );

      const character = screen.getByText('Product Lead');
      fireEvent.click(character);
      
      const nameInput = screen.getByPlaceholderText('Введите имя персонажа');
      fireEvent.change(nameInput, { target: { value: 'Test PM' } });

      const confirmButton = screen.getByText('Продолжить');
      fireEvent.click(confirmButton);

      expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({
        customName: 'Test PM'
      }));
    });
  });
}); 