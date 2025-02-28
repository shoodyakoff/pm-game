import { apiService } from '../services/apiService';
import { GameState } from '../types/game';

export const ensureFullImage = (imagePath: string) => {
  if (!imagePath) return imagePath;
  
  // Сначала получаем базовый путь без расширения
  const base = imagePath.split('.')[0].replace(/-full/g, '');
  
  // Затем добавляем -full и расширение
  return `${base}-full.png`;
};

export const saveGameState = (state: GameState) => {
  try {
    const stateToSave = {
      ...state,
      character: state.character ? {
        ...state.character,
        image: ensureFullImage(state.character.image)
      } : null
    };
    localStorage.setItem('gameState', JSON.stringify(stateToSave));
  } catch (error) {
    // Тихая обработка ошибки
  }
};

export const loadGameState = (): GameState | null => {
  const saved = localStorage.getItem('gameState');
  if (!saved) return null;
  
  const state = JSON.parse(saved);
  if (state.character) {
    state.character.image = ensureFullImage(state.character.image);
  }
  return state;
}; 