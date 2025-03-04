'use client';

import React, { FC, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Character } from '@/types/character';
import { GameState, LevelProgress } from '@/types/game';
import { EquippedItems } from '@/types/inventory';
import CharacterSelection from './CharacterSelection';
import CharacterCustomization from './CharacterCustomization';
import CharacterEquipment from './CharacterEquipment';
import LevelMap from './LevelMap';
import Level1 from './levels/Level1';
import Level2 from './levels/Level2';
import Level3 from './levels/Level3';

// Начальный прогресс уровней
const initialLevelProgress: LevelProgress[] = [
  { id: 1, isCompleted: false, isAvailable: true },
  { id: 2, isCompleted: false, isAvailable: false },
  { id: 3, isCompleted: false, isAvailable: false }
];

// Функция для сохранения состояния игры в localStorage
const saveGameState = (state: GameState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('gameState', JSON.stringify(state));
  }
};

// Функция для загрузки состояния игры из localStorage
const loadGameState = (): GameState | null => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        console.error('Ошибка при загрузке состояния игры:', e);
        return null;
      }
    }
  }
  return null;
};

// Создаем компонент DndProvider, который не будет рендериться на сервере
const DndProviderWithNoSSR = dynamic(
  () => Promise.resolve(({ children }: { children: React.ReactNode }) => (
    <DndProvider backend={HTML5Backend}>{children}</DndProvider>
  )),
  { ssr: false }
);

const Game: FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    step: 'character_selection',
    character: null,
    inventory: {
      head: null,
      body: null,
      weapon: null,
      transport: null
    },
    selectedLevel: null,
    levelProgress: initialLevelProgress
  });
  
  // Загрузка сохраненного состояния игры при монтировании компонента
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      // Убедимся, что у нас есть levelProgress в сохраненном состоянии
      if (!savedState.levelProgress) {
        savedState.levelProgress = initialLevelProgress;
      }
      setGameState(savedState);
    }
  }, []);
  
  // Сохранение состояния игры при его изменении
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);
  
  // Обработчик выбора персонажа
  const handleCharacterSelect = (character: Character) => {
    setGameState(prevState => ({
      ...prevState,
      step: 'character_customization',
      character
    }));
  };
  
  // Обработчик персонализации персонажа
  const handleCharacterCustomize = (customName: string) => {
    if (gameState.character) {
      const customizedCharacter = {
        ...gameState.character,
        customName
      };
      
      setGameState(prevState => ({
        ...prevState,
        step: 'character_equipment',
        character: customizedCharacter
      }));
    }
  };
  
  // Обработчик экипировки персонажа
  const handleEquipmentComplete = (equippedItems: EquippedItems) => {
    setGameState(prevState => ({
      ...prevState,
      step: 'level_map',
      inventory: equippedItems
    }));
  };
  
  // Обработчик выбора уровня
  const handleLevelSelect = (level: number) => {
    setGameState(prevState => ({
      ...prevState,
      step: 'level',
      selectedLevel: level
    }));
  };
  
  // Обработчик завершения уровня
  const handleLevelComplete = () => {
    // Обновляем прогресс уровней
    const currentLevel = gameState.selectedLevel;
    
    if (currentLevel) {
      setGameState(prevState => {
        // Создаем копию текущего прогресса уровней
        const updatedLevelProgress = [...(prevState.levelProgress || initialLevelProgress)];
        
        // Отмечаем текущий уровень как завершенный
        const currentLevelIndex = updatedLevelProgress.findIndex(level => level.id === currentLevel);
        if (currentLevelIndex !== -1) {
          updatedLevelProgress[currentLevelIndex] = {
            ...updatedLevelProgress[currentLevelIndex],
            isCompleted: true
          };
          
          // Открываем следующий уровень, если он существует
          if (currentLevelIndex + 1 < updatedLevelProgress.length) {
            updatedLevelProgress[currentLevelIndex + 1] = {
              ...updatedLevelProgress[currentLevelIndex + 1],
              isAvailable: true
            };
          }
        }
        
        return {
          ...prevState,
          step: 'level_map',
          levelProgress: updatedLevelProgress
        };
      });
    } else {
      // Если по какой-то причине currentLevel не определен, просто возвращаемся на карту
      setGameState(prevState => ({
        ...prevState,
        step: 'level_map'
      }));
    }
  };
  
  // Обработчик возврата на предыдущий экран
  const handleBack = () => {
    setGameState(prevState => {
      switch (prevState.step) {
        case 'character_customization':
          return { ...prevState, step: 'character_selection' };
        case 'character_equipment':
          return { ...prevState, step: 'character_customization' };
        case 'level_map':
          return { ...prevState, step: 'character_equipment' };
        case 'level':
          return { ...prevState, step: 'level_map' };
        default:
          return prevState;
      }
    });
  };

  // Обработчик продолжения после экипировки
  const handleContinueAfterEquipment = () => {
    setGameState(prevState => ({
      ...prevState,
      step: 'level_map'
    }));
  };

  // Обработчик смены персонажа
  const handleChangeCharacter = () => {
    setGameState(prevState => ({
      ...prevState,
      step: 'character_selection'
    }));
  };
  
  // Рендеринг текущего шага игры
  const renderGameStep = () => {
    switch (gameState.step) {
      case 'character_selection':
        return <CharacterSelection onCharacterSelect={handleCharacterSelect} />;
        
      case 'character_customization':
        if (gameState.character) {
          return (
            <CharacterCustomization 
              character={gameState.character} 
              onBack={handleBack}
              onComplete={handleCharacterCustomize}
            />
          );
        }
        return null;
        
      case 'character_equipment':
        if (gameState.character) {
          return (
            <DndProviderWithNoSSR>
              <CharacterEquipment 
                character={gameState.character as Character & { customName: string }}
                inventory={gameState.inventory}
                onBack={handleBack}
                onComplete={handleEquipmentComplete}
                onContinue={handleContinueAfterEquipment}
                onChangeCharacter={handleChangeCharacter}
                unlockedSlots={2}
              />
            </DndProviderWithNoSSR>
          );
        }
        return null;
        
      case 'level_map':
        if (gameState.character) {
          return (
            <LevelMap 
              character={gameState.character as Character & { customName: string }}
              onLevelSelect={handleLevelSelect}
              onBack={handleBack}
              levelProgress={gameState.levelProgress || initialLevelProgress}
            />
          );
        }
        return null;
        
      case 'level':
        if (gameState.character && gameState.selectedLevel) {
          switch (gameState.selectedLevel) {
            case 1:
              return (
                <Level1 
                  character={gameState.character as Character & { customName: string }}
                  inventory={gameState.inventory}
                  onBack={handleBack}
                  onComplete={handleLevelComplete}
                />
              );
            case 2:
              return (
                <Level2 
                  character={gameState.character as Character & { customName: string }}
                  inventory={gameState.inventory}
                  onBack={handleBack}
                  onComplete={handleLevelComplete}
                />
              );
            case 3:
              return (
                <Level3 
                  character={gameState.character as Character & { customName: string }}
                  inventory={gameState.inventory}
                  onBack={handleBack}
                  onComplete={handleLevelComplete}
                />
              );
            default:
              return null;
          }
        }
        return null;
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      {renderGameStep()}
    </div>
  );
};

export default Game;