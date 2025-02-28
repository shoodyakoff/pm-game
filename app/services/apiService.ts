import { GameState } from '../types/game';

const STORAGE_KEY = 'pm_game_state';

export const apiService = {
  saveGame: (state: GameState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
  
  loadGame: (): GameState | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  },

  // Другие методы для работы с данными
  clearGame: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
}; 