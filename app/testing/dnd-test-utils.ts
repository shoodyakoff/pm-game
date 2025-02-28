import { fireEvent, act } from '@testing-library/react';
import { render } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';
import { DndTestUtils } from './types';

// Утилиты для тестирования DnD компонентов
export const createDndTestUtils = (): DndTestUtils => {
  const mockDrop = jest.fn();
  const mockDrag = jest.fn();

  const renderWithDnd = (ui: React.ReactElement) => {
    return render(
      React.createElement(DndProvider, { backend: HTML5Backend }, ui)
    );
  };

  // Хелперы для тестирования
  const simulateDragDrop = async (source: Element, target: Element): Promise<void> => {
    await act(async () => {
      // Симулируем начало перетаскивания
      fireEvent.dragStart(source, {
        dataTransfer: {
          setData: () => {},
          getData: () => '',
          dropEffect: 'move'
        }
      });
      await new Promise(resolve => setTimeout(resolve, 50));

      // Симулируем наведение на цель
      fireEvent.dragEnter(target);
      fireEvent.dragOver(target);
      await new Promise(resolve => setTimeout(resolve, 50));

      // Симулируем сброс
      fireEvent.drop(target, {
        dataTransfer: {
          getData: () => '',
          dropEffect: 'move'
        }
      });
      fireEvent.dragEnd(source);
      await new Promise(resolve => setTimeout(resolve, 50));
    });
  };

  return {
    mockDrop,
    mockDrag,
    simulateDragDrop,
    renderWithDnd
  };
}; 