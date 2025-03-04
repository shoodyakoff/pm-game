import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Утилита для рендеринга компонентов с DnD
export const renderWithDnd = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    ),
    ...options
  });
};

// Эмиттер событий для тестирования
export class TestEventEmitter {
  listeners: Record<string, Function[]> = {};

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
}

export const testEventEmitter = new TestEventEmitter();

// Мок для персонажа
export const mockCharacter = {
  id: '1',
  type: 'product-owner',
  displayName: 'Product Owner',
  roleTitle: 'Product Owner',
  description: 'Отвечает за продукт',
  image: '/images/characters/po.png',
  icon: '/images/characters/po-icon.png',
  difficulty: 'Нормально',
  stats: {
    impact: 80,
    leadership: 70,
    technical: 60
  },
  customName: 'Тестовый Персонаж'
};

// Мок для экипировки
export const mockEquippedItems = {
  hat: null,
  armor: null,
  weapon: null,
  transport: null
}; 