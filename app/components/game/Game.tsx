import { FC, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { GameState, Character, Product, DragItem, InventoryItem, ItemCategory } from '../../types/game';
import CharacterSelection from './CharacterSelection';  // Добавляем импорт
import CharacterCustomization from './CharacterCustomization';
import ProductSelection from './levels/ProductSelection';

const Game: FC = () => {
  const initialItems = useMemo<Record<ItemCategory, InventoryItem>>(() => {
    const items = {
      hat: {
        id: 'hat1',
        title: 'Startup Hat',
        image: '/items/hat_startup.png',
        category: 'hat' as ItemCategory
      },
      shirt: {
        id: 'shirt1',
        title: 'Unicorn Shirt',
        image: '/items/shirt_unicorn.png',
        category: 'shirt' as ItemCategory
      },
      pants: {
        id: 'pants1',
        title: 'Casual Pants',
        image: '/items/pants_casual.png',
        category: 'pants' as ItemCategory
      },
      transport: {
        id: 'transport1',
        title: 'Electric Scooter',
        image: '/items/scooter_electric.png',
        category: 'transport' as ItemCategory
      }
    };
    console.log('Game: initialItems created:', items);
    return items;
  }, []);

  const [gameState, setGameState] = useState<GameState>({
    step: 'selection',  // Меняем начальный шаг
    character: null,    // Начальный персонаж null
    inventory: {
      hat: null,
      shirt: null,
      pants: null,
      transport: null
    },
    progress: {}
  });

  // Добавляем обработчик выбора персонажа
  const handleCharacterSelect = (character: Character & { customName: string }) => {
    setGameState(prev => ({
      ...prev,
      character: {
        ...character,
        name: character.customName // Используем введенное имя
      },
      step: 'character'
    }));
  };

  useEffect(() => {
    console.log('Game mounted with items:', initialItems);
    console.log('Game state:', gameState);
  }, [initialItems, gameState]);

  const handleCharacterComplete = (character: Character) => {
    setGameState(prev => ({
      ...prev,
      character,
      step: 'level1'
    }));
  };

  const handleProductSelect = (product: Product) => {
    setGameState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        level1: { product, completed: true }
      },
      step: 'level2'
    }));
  };

  const handleEquip = (category: ItemCategory, dragItem: DragItem | null) => {
    if (dragItem) {
      const item: InventoryItem = {
        id: dragItem.id,
        title: dragItem.title,
        image: dragItem.image,
        category: dragItem.category
      };
      
      setGameState(prev => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          [category]: item
        }
      }));
    }
  };

  const renderStep = () => {
    if (!gameState) return null;

    switch(gameState.step) {
      case 'selection':
        return <CharacterSelection onSelect={handleCharacterSelect} />;
        
      case 'character':
        if (!initialItems || Object.keys(initialItems).length === 0) {
          console.error('Items not initialized');
          return null;
        }

        return gameState.character ? (
          <CharacterCustomization 
            items={initialItems}
            selectedCharacter={gameState.character}
            equippedItems={gameState.inventory}
            handleEquip={handleEquip}
            onComplete={handleCharacterComplete}
          />
        ) : null;

      case 'level1':
        return <ProductSelection onSelect={handleProductSelect} />;
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {renderStep()}
    </div>
  );
};

export default Game;