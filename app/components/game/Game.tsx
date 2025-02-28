'use client';

import { FC, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GameState, Character, Product, DragItem, InventoryItem, ItemCategory, LevelProgress, LevelResult } from '../../types/game';
import CharacterSelection from './CharacterSelection';
import { CharacterEquipment } from './CharacterEquipment';
import Level1 from './levels/Level1';
import { LevelMap } from './LevelMap';
import { saveGameState, loadGameState, ensureFullImage } from '../../utils/storage';
import dynamic from 'next/dynamic';
import { mockCharacters } from '../../testing/mocks/character-mocks';
import Level2 from './levels/Level2';
import Level3 from './levels/Level3';

const DndProviderWithNoSSR = dynamic(
  () => import('react-dnd').then(mod => mod.DndProvider),
  { ssr: false }
);

export const Game: FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadGameState();
    if (saved) {
      return {
        ...saved,
        step: 'map'
      };
    }
    // Начальное состояние для новой игры
    return {
      step: 'map',
      character: mockCharacters[0],
      inventory: {
        hat: null,
        shirt: null,
        pants: null,
        transport: null
      },
      progress: {}
    };
  });

  // Сохраняем состояние через storage.ts
  useEffect(() => {
    saveGameState({
      ...gameState,
      step: 'map' // Всегда сохраняем с шагом map
    });
  }, [gameState]);

  const handleCharacterSelect = (character: Character & { customName: string }) => {
    setGameState(prev => ({
      ...prev,
      character: {
        ...character,
        name: character.customName,
        type: character.type,
        image: ensureFullImage(character.image)
      },
      step: 'map'
    }));
  };

  const handleMapLevelSelect = (levelId: number) => {
    setGameState(prev => ({
      ...prev,
      character: {
        ...prev.character,
        image: ensureFullImage(prev.character?.image)
      },
      step: 'character'
    }));
  };

  const handleEquipmentComplete = (equippedItems: Record<ItemCategory, InventoryItem | null>) => {
    // Убираем автоматический переход на следующий уровень
    saveGameState({
      ...gameState,
      inventory: equippedItems
    });
    setGameState(prev => ({
      ...prev,
      inventory: equippedItems,
      // Не меняем step здесь, это должно происходить только по кнопке "Продолжить"
    }));
  };

  const handleEquipmentContinue = () => {
    setGameState(prev => ({
      ...prev,
      step: 'level1'
    }));
  };

  const handleLevelComplete = (result: LevelResult) => {
    setGameState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        level1: {
          ...result,
          items: []
        }
      },
      step: 'map'
    }));
  };

  const handleReset = () => {
    setGameState(prev => ({
      ...prev,
      progress: {},
      step: 'map',
      inventory: {
        hat: null,
        shirt: null,
        pants: null,
        transport: null
      }
    }));
    saveGameState({
      ...gameState,
      progress: {},
      step: 'map',
      inventory: {
        hat: null,
        shirt: null,
        pants: null,
        transport: null
      }
    });
  };

  const levels = [
    { id: 1, position: "top-[20%] left-[10%]", title: "Уровень 1" },
    { id: 2, position: "top-[35%] left-[27.5%]", title: "Уровень 2" },
    { id: 3, position: "top-[20%] left-[45%]", title: "Уровень 3" },
    { id: 4, position: "top-[35%] left-[62.5%]", title: "Уровень 4" },
    { id: 5, position: "top-[20%] left-[80%]", title: "Уровень 5" }
  ];

  const renderStep = () => {
    if (!gameState) return null;

    switch(gameState.step) {
      case 'selection':
        return <CharacterSelection onSelect={handleCharacterSelect} />;
        
      case 'map':
        return gameState.character ? (
          <LevelMap
            levels={levels}
            unlockedLevels={[1, ...Object.keys(gameState.progress).map(key => {
              // Получаем номер уровня из ключа (level1 -> 1)
              const levelNum = parseInt(key.replace('level', ''));
              // Добавляем следующий уровень как доступный
              return levelNum + 1;
            })]}
            characterLevel={1}
            nickname={gameState.character.name}
            characterType={gameState.character.type}
            characterIcon={gameState.character.icon || gameState.character.image.replace('-full.png', '-icon.png')}
            setCurrentLevel={handleMapLevelSelect}
            setStep={(step: GameState['step']) => setGameState(prev => ({ ...prev, step }))}
            onReset={handleReset}
          />
        ) : null;

      case 'character':
        return gameState.character ? (
          <CharacterEquipment
            character={gameState.character}
            onComplete={handleEquipmentComplete}
            onBack={() => setGameState(prev => ({ ...prev, step: 'map' }))}
            onContinue={handleEquipmentContinue}
          />
        ) : null;

      case 'level1':
      case 'level2':
      case 'level3':
        const LevelComponent = {
          level1: Level1,
          level2: Level2,
          level3: Level3
        }[gameState.step];

        return gameState.character ? (
          <LevelComponent 
            character={gameState.character}
            inventory={gameState.inventory}
            onBack={() => setGameState(prev => ({ ...prev, step: 'map' }))}
            onComplete={handleLevelComplete}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <DndProviderWithNoSSR backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-900">
        {renderStep()}
      </div>
    </DndProviderWithNoSSR>
  );
};

export default Game;