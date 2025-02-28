import { RenderResult } from '@testing-library/react';

export interface DndTestUtils {
  renderWithDnd: (ui: React.ReactElement) => RenderResult;
  simulateDragDrop: (source: Element, target: Element) => Promise<void>;
  mockDrop: jest.Mock;
  mockDrag: jest.Mock;
} 