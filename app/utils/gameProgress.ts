import { GameState } from '@/types/game';

const GAME_PROGRESS_KEY = 'pm_game_progress';
const COMPLETED_LEVELS_KEY = 'pm_completed_levels';

// Сохранение состояния игры в localStorage
export const saveGameState = (gameState: GameState): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(GAME_PROGRESS_KEY, JSON.stringify(gameState));
  }
};

// Загрузка состояния игры из localStorage
export const loadGameState = (): GameState | null => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem(GAME_PROGRESS_KEY);
    if (savedState) {
      try {
        return JSON.parse(savedState) as GameState;
      } catch (error) {
        console.error('Ошибка при загрузке состояния игры:', error);
        return null;
      }
    }
  }
  return null;
};

// Сохранение информации о пройденных уровнях
export const saveCompletedLevels = (completedLevels: number[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(COMPLETED_LEVELS_KEY, JSON.stringify(completedLevels));
  }
};

// Загрузка информации о пройденных уровнях
export const loadCompletedLevels = (): number[] => {
  if (typeof window !== 'undefined') {
    const savedLevels = localStorage.getItem(COMPLETED_LEVELS_KEY);
    if (savedLevels) {
      try {
        return JSON.parse(savedLevels) as number[];
      } catch (error) {
        console.error('Ошибка при загрузке пройденных уровней:', error);
        return [];
      }
    }
  }
  return [];
};

// Добавление уровня в список пройденных
export const completeLevel = (levelNumber: number): void => {
  const completedLevels = loadCompletedLevels();
  if (!completedLevels.includes(levelNumber)) {
    completedLevels.push(levelNumber);
    saveCompletedLevels(completedLevels);
  }
};

// Проверка, пройден ли уровень
export const isLevelCompleted = (levelNumber: number): boolean => {
  const completedLevels = loadCompletedLevels();
  return completedLevels.includes(levelNumber);
};

// Сброс всего прогресса игры
export const resetGameProgress = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(GAME_PROGRESS_KEY);
    localStorage.removeItem(COMPLETED_LEVELS_KEY);
  }
};

export default {
  saveGameState,
  loadGameState,
  saveCompletedLevels,
  loadCompletedLevels,
  completeLevel,
  isLevelCompleted,
  resetGameProgress
}; 