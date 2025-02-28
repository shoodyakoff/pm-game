import { screen, fireEvent, waitFor } from '@testing-library/react';
import { CharacterEquipment } from './CharacterEquipment';
import { setupTest } from '../../testing/test-utils';
import { mockCharacters } from '../../testing/mocks/character-mocks';
import { items } from '../../testing/mocks/game-mocks';
import { testEventEmitter } from '../../testing/test-utils/EventEmitter';

describe('CharacterEquipment', () => {
  const utils = setupTest();
  const mockCharacter = mockCharacters[0]; // Product Lead
  const onComplete = jest.fn();
  const onBack = jest.fn();
  const onContinue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all equipment slots', () => {
      utils.renderWithDnd(
        <CharacterEquipment 
          character={mockCharacter}
          onComplete={onComplete}
          onBack={onBack}
          onContinue={onContinue}
        />
      );

      expect(screen.getByTestId('slot-hat')).toBeInTheDocument();
      expect(screen.getByTestId('slot-shirt')).toBeInTheDocument();
      expect(screen.getByTestId('slot-pants')).toBeInTheDocument();
      expect(screen.getByTestId('slot-transport')).toBeInTheDocument();
    });

    it('should render available items', () => {
      utils.renderWithDnd(
        <CharacterEquipment 
          character={mockCharacter}
          onComplete={onComplete}
          onBack={onBack}
          onContinue={onContinue}
        />
      );

      const items = [
        { id: 'hat', title: 'Шапка стартапера' },
        { id: 'shirt', title: 'Кольчуга менеджера' },
        { id: 'pants', title: 'Оружие' },
        { id: 'transport', title: 'Электроягуар' }
      ];

      items.forEach(item => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });
  });

  describe('Equipment Interaction', () => {
    it('should equip item on drag and drop', async () => {
      utils.renderWithDnd(
        <CharacterEquipment 
          character={mockCharacter}
          onComplete={onComplete}
          onBack={onBack}
          onContinue={onContinue}
        />
      );

      testEventEmitter.dispatchEvent('dnd-drop', items.hat);

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({
          hat: expect.objectContaining({
            title: 'Шапка стартапера'
          })
        }));
      });
    });

    it('should unequip item on click', async () => {
      utils.renderWithDnd(
        <CharacterEquipment 
          character={mockCharacter}
          onComplete={onComplete}
          onBack={onBack}
          onContinue={onContinue}
        />
      );

      // Сначала экипируем
      testEventEmitter.dispatchEvent('dnd-drop', items.hat);

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalled();
      });

      // Затем снимаем
      const equippedItem = screen.getByTestId('equipped-hat');
      fireEvent.click(equippedItem);

      await waitFor(() => {
        expect(onComplete).toHaveBeenLastCalledWith(expect.objectContaining({
          hat: null
        }));
      });
    });

    it('should handle equipment selection', async () => {
      utils.renderWithDnd(
        <CharacterEquipment
          character={mockCharacter}
          onComplete={onComplete}
          onBack={onBack}
          onContinue={onContinue}
        />
      );

      // Экипируем предмет
      testEventEmitter.dispatchEvent('dnd-drop', items.hat);

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalled();
      });

      const continueButton = screen.getByText('Продолжить');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalled();
      });
    });
  });
}); 