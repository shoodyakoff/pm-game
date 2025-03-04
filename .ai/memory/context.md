# PM-Game Project Context

## Project Overview
Образовательная игра для PM'ов с элементами RPG

## Текущий этап
MVP - разработка базовой системы:
- 5 типов персонажей
- 5 уровней
- Линейные диалоги
- Система прогресса

## Key Technologies
- Next.js
- TypeScript
- React DnD
- Framer Motion
- Firebase (auth)
- OpenAI API (будущее)

## Development Principles
1. Educational First
2. Engaging Gameplay
3. Progressive Learning
4. Real PM Scenarios

## Архитектурные решения
- Client-side рендеринг
- Firebase для авторизации
- LocalStorage для сохранений 

/* Добавьте эти стили в ваш CSS-файл или в стили компонента */
.level-map-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
}

.level-nodes {
  position: relative;
  width: 100%;
  height: 100%;
}

.level-node {
  position: absolute;
  width: 150px;
  text-align: center;
  cursor: pointer;
}

/* Позиции для каждого уровня */
.level-node.level-1 {
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
}

.level-node.level-2 {
  top: 30%;
  left: 30%;
  transform: translateY(-50%);
}

.level-node.level-3 {
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
}

.level-node.level-4 {
  top: 30%;
  left: 70%;
  transform: translateY(-50%);
}

.level-node.level-5 {
  top: 50%;
  left: 90%;
  transform: translateY(-50%);
}

/* Стили для заголовков уровней */
.level-title {
  margin-top: 10px;
  font-weight: bold;
  white-space: nowrap;
} 