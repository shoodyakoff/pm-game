import { apiService } from '../services/apiService';
import { GameState } from '../types/game';

export const ensureFullImage = (image: string): string => {
  if (image.startsWith('http')) {
    return image;
  }
  return image;
};

export const saveGameState = (state: GameState) => {
  if (typeof window !== 'undefined') {
    const stateToSave = {
      ...state,
      character: state.character ? {
        ...state.character,
        image: ensureFullImage(state.character.image)
      } : null
    };
    localStorage.setItem('gameState', JSON.stringify(stateToSave));
  }
};

export const loadGameState = (): GameState | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const saved = localStorage.getItem('gameState');
  if (!saved) return null;
  
  const state = JSON.parse(saved);
  if (state.character) {
    state.character.image = ensureFullImage(state.character.image);
  }
  return state;
}; 