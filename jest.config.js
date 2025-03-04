const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Путь к вашему Next.js приложению
  dir: './',
});

// Конфигурация Jest
const customJestConfig = {
  // Добавьте больше настроек здесь, если нужно
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Обработка импортов с алиасами
    '^@/(.*)$': '<rootDir>/app/$1',
    // Мок для CSS модулей
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    // Мок для изображений
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  testMatch: [
    "<rootDir>/app/**/*.test.{ts,tsx}"
  ],
  transform: {
    // Используйте babel-jest для обработки JS/TS файлов
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/app/components/game/CharacterEquipment.test.tsx',
    '<rootDir>/app/components/game/levels/Level1.test.tsx'
  ],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  testEnvironmentOptions: {
    customExportConditions: [''] // Для поддержки "exports" в package.json
  }
};

// Экспортируем конфигурацию Jest
module.exports = createJestConfig(customJestConfig); 