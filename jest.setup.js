// Импортируем расширения для Jest
import '@testing-library/jest-dom';

const { testEventEmitter } = require('./app/testing/test-utils/EventEmitter');

// Моки для react-dnd
jest.mock('react-dnd', () => ({
  DndProvider: ({ children }) => children,
  useDrag: () => [
    { isDragging: false },
    (element) => {
      if (element) {
        element.setAttribute('draggable', 'true');
      }
      return element;
    },
    () => ({})
  ],
  useDrop: () => {
    return [
      { isOver: false },
      (element) => element,
      (item) => {
        testEventEmitter.dispatchEvent('dnd-drop', item);
      }
    ];
  }
}));

jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: {}
}));

// Мок для dynamic import
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (callback) => {
    let Component;
    callback().then(mod => {
      Component = mod.DndProvider;
    });
    return function DummyDndProvider({ children }) {
      return children;
    };
  }
}));

// Добавляем глобальный слушатель
beforeAll(() => {
  const originalAddEventListener = document.addEventListener;
  const originalRemoveEventListener = document.removeEventListener;
  const originalDispatchEvent = document.dispatchEvent;

  document.addEventListener = jest.fn((event, handler) => {
    return originalAddEventListener.call(document, event, handler);
  });

  document.removeEventListener = jest.fn((event, handler) => {
    return originalRemoveEventListener.call(document, event, handler);
  });

  document.dispatchEvent = jest.fn((event) => {
    return originalDispatchEvent.call(document, event);
  });
});

// Мок для window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // устаревший
    removeListener: jest.fn(), // устаревший
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Мок для IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Подавление консольных предупреждений в тестах
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  if (
    /Warning.*not wrapped in act/i.test(args[0]) ||
    /Warning.*ReactDOM.render is no longer supported/i.test(args[0])
  ) {
    return;
  }
  originalConsoleError(...args);
};

console.warn = (...args) => {
  if (/Warning.*not wrapped in act/i.test(args[0])) {
    return;
  }
  originalConsoleWarn(...args);
}; 