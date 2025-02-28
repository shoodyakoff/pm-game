import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { apiService } from '../services/apiService';
import { mockGameState } from '../testing/mocks/game-mocks';
import { saveGameState, loadGameState } from './storage';
import { GameState } from '../types/game';

// Создаем правильный мок для localStorage
const mockStorage: { [key: string]: string } = {};
const localStorageMock = {
  getItem: jest.fn((key: string) => mockStorage[key] || null),
  setItem: jest.fn((key: string, value: string) => {
    mockStorage[key] = value;
  }),
  clear: jest.fn(() => {
    Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
  })
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Создаем мок для хранения состояния
const mockState = {
  value: null as string | null,
  clear: () => { mockState.value = null }
};

// Мокаем apiService
jest.mock('../services/apiService', () => ({
  apiService: {
    saveGame: jest.fn((state) => {
      mockState.value = JSON.stringify(state);
    }),
    loadGame: jest.fn(() => {
      if (!mockState.value) return null;
      try {
        return JSON.parse(mockState.value);
      } catch {
        return null;
      }
    }),
    clearGame: jest.fn(() => {
      mockState.clear();
    })
  }
}));

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
    mockState.clear(); // Очищаем состояние перед каждым тестом
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should save and load game state', () => {
    const testState: GameState = {
      step: 'selection',
      character: mockGameState.character,
      inventory: mockGameState.inventory,
      progress: mockGameState.progress
    };

    saveGameState(testState);
    const loaded = loadGameState();
    expect(loaded).toEqual(testState);
  });

  it('should return null when no state saved', () => {
    const state = loadGameState();
    expect(state).toBeNull();
  });

  it('should handle invalid JSON', () => {
    mockState.value = 'invalid json';
    const state = loadGameState();
    expect(state).toBeNull();
  });

  it('should save game state', () => {
    saveGameState(mockGameState);
    expect(apiService.saveGame).toHaveBeenCalledWith(mockGameState);
  });

  it('should load game state', () => {
    (apiService.loadGame as jest.Mock).mockReturnValue(mockGameState);
    const state = loadGameState();
    expect(apiService.loadGame).toHaveBeenCalled();
    expect(state).toEqual(mockGameState);
  });
}); 