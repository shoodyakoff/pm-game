'use client';

import React, { FC, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Character } from '@/types/character';
import { GameState, GameScreen, LevelProgress, LevelStatus } from '@/types/game';
import { EquippedItems } from '@/types/inventory';
import CharacterSelection from './CharacterSelection';
import CharacterCustomization from './CharacterCustomization';
import CharacterEquipment from './CharacterEquipment';
import LevelMap from './LevelMap';
import Level1 from './levels/Level1';
import Level2 from './levels/Level2';
import Level3 from './levels/Level3';

// Начальный прогресс уровней
const initialLevelProgress: LevelProgress = {
  level1: 'available',
  level2: 'locked',
  level3: 'locked'
};

// Начальное состояние экипировки
const initialEquippedItems: EquippedItems = {
  head: null,
  body: null,
  weapon: null,
  transport: null
};

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

// Обновленный интерфейс для LevelMap
interface UpdatedLevelMapProps {
  character: Character & { customName: string };
  onLevelSelect: (level: string) => void;
  onBack: () => void;
  levelProgress: LevelProgress;
}

// Обновленный интерфейс для CharacterEquipment
interface UpdatedCharacterEquipmentProps {
  character: Character & { customName: string };
  inventory: EquippedItems;
  onBack: () => void;
  onComplete: (equippedItems: EquippedItems) => void;
  onChangeCharacter: () => void;
  unlockedSlots: number;
  selectedLevel: string;
}

// Определяем все возможные экраны в игре
type GameScreen = 
  | 'character-selection'
  | 'map' 
  | 'equipment' 
  | 'level1-intro'
  | 'level1-selection'
  | 'level1-analysis'
  | 'level1-summary';

// Интерфейс для состояния игры
interface GameState {
  currentScreen: GameScreen;
  selectedLevel: string | null;
  inventory: EquippedItems;
  character: Character & { customName: string } | null;
  levelProgress: LevelProgress;
}

interface GameProps {
  onBack: () => void;
}

const Game: FC<GameProps> = ({ onBack }) => {
  // Инициализируем состояние игры
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'character-selection',
    selectedLevel: null,
    inventory: {
      weapon: null,
      armor: null,
      artifact: null
    },
    character: null,
    levelProgress: initialLevelProgress
  });
  
  // Загрузка сохраненного состояния игры при монтировании компонента
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      // Проверяем, что сохраненное состояние соответствует новой структуре
      // Если нет, используем значения по умолчанию
      const validState: GameState = {
        currentScreen: savedState.currentScreen || 'character-selection',
        selectedLevel: savedState.selectedLevel || null,
        inventory: savedState.inventory || initialEquippedItems,
        character: savedState.character || null,
        levelProgress: savedState.levelProgress || initialLevelProgress
      };
      setGameState(validState);
    }
  }, []);
  
  // Сохранение состояния игры при его изменении
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);
  
  // Обработчик выбора персонажа
  const handleCharacterSelect = (selectedCharacter: Character & { customName: string }) => {
    setGameState(prev => ({
      ...prev,
      character: selectedCharacter,
      currentScreen: 'map'
    }));
  };
  
  // Обработчик выбора уровня
  const handleLevelSelect = (levelId: string) => {
    setGameState(prev => ({
      ...prev,
      selectedLevel: levelId,
      currentScreen: 'equipment'
    }));
  };
  
  // Обработчик завершения экипировки
  const handleEquipmentComplete = (equippedItems: EquippedItems) => {
    setGameState(prev => ({
      ...prev,
      inventory: equippedItems,
      currentScreen: prev.selectedLevel === 'level1' ? 'level1-intro' : 'map'
    }));
  };
  
  // Обработчик возврата к карте уровней
  const handleBackToMap = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'map',
      selectedLevel: null
    }));
  };
  
  // Обработчик завершения уровня
  const handleLevelComplete = (rewards?: any) => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'map',
      selectedLevel: null,
      levelProgress: {
        ...prev.levelProgress,
        [prev.selectedLevel as string]: 'completed',
        [`level${Number(prev.selectedLevel?.replace('level', '')) + 1}`]: 'available'
      }
    }));
  };
  
  // Функция рендеринга текущего экрана
  const renderScreen = () => {
    switch (gameState.currentScreen) {
      case 'character-selection':
        return <CharacterSelection onSelect={handleCharacterSelect} />;
      
      case 'map':
        if (!gameState.character) return null;
        return (
          <LevelMap 
            character={gameState.character}
            inventory={gameState.inventory}
            onBack={onBack}
            onLevelSelect={handleLevelSelect}
            levelProgress={gameState.levelProgress}
          />
        );
      
      case 'equipment':
        if (!gameState.character) return null;
        return (
          <CharacterEquipment
            character={gameState.character}
            inventory={gameState.inventory}
            onBack={handleBackToMap}
            onComplete={handleEquipmentComplete}
            selectedLevel={gameState.selectedLevel}
          />
        );
      
      case 'level1-intro':
      case 'level1-selection':
      case 'level1-analysis':
      case 'level1-summary':
        if (!gameState.character) return null;
        return (
          <Level1
            character={gameState.character}
            inventory={gameState.inventory}
            onBack={handleBackToMap}
            onComplete={handleLevelComplete}
            initialStep={gameState.currentScreen.replace('level1-', '') as 'intro' | 'selection' | 'analysis' | 'summary'}
          />
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      {renderScreen()}
    </div>
  );
};

export default Game;