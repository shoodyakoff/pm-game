# PM-Game: Product Requirements Document

## Описание продукта
Образовательная игра для обучения Product Manager'ов через игровые механики. Игрок развивает своего PM-персонажа, решая реальные продуктовые задачи и принимая стратегические решения.

## Целевая аудитория
- Начинающие PM
  - Студенты профильных курсов
  - Джуниор PM'ы (0-1 год опыта)
- Специалисты, меняющие карьеру
  - Разработчики
  - Аналитики
  - Дизайнеры

## Ключевые ценности
1. Обучение через практику
2. Геймификация реальных сценариев
3. Прогресс и обратная связь
4. Социальное взаимодействие

## Основные функции

### 1. Базовая механика
- ⬜ Авторизация через Google
- ✅ Автосохранение прогресса
- ✅ Создание персонажа
  - ✅ Выбор имени
  - ✅ Выбор базового типа PM
  - ✅ Базовые характеристики

### 2. Игровой мир
- ✅ Интерактивная карта уровней
  - ✅ Визуализация прогресса
  - ✅ Открытие новых уровней
  - ✅ Индикация сложности
- ✅ Система уровней
  - ✅ Последовательное открытие
  - ✅ Различные сценарии
  - ✅ Специальные условия для разных типов PM
- ✅ Система диалогов
  - ✅ Линейные диалоги с NPC в уровнях
  - ✅ Подведение итогов после уровня
  - ⬜ Будущее: ветвление диалогов
  - ⬜ Будущее: интеграция с AI для анализа решений

### 3. Система персонажей
- ✅ Выбор персонажа перед уровнем
- ✅ Экипировка и подготовка
  - ✅ Специальные предметы для типов PM
  - ✅ Врожденные способности персонажей
- ⬜ Система развития
  - ⬜ Получение опыта
  - ✅ Новые предметы
  - ⬜ Улучшение характеристик

### 4. Система наград и обратной связи
- ⬜ Опыт за прохождение
- ✅ Предметы экипировки
- ✅ Открытие новых уровней
- ⬜ Достижения
- ⬜ Анализ решений
  - ⬜ Оценка прохождения уровня
  - ⬜ Рекомендации по улучшению
  - ⬜ Статистика решений

## Технические требования

### 1. Производительность
- ✅ Время загрузки < 2 секунд
- ✅ 60 FPS для анимаций
- ⬜ Оптимизация для мобильных устройств

### 2. Хранение данных
- ✅ Локальное сохранение прогресса
- ⬜ Синхронизация между устройствами
- ⬜ Защита данных пользователя

### 3. Интеграции
- ⬜ OpenAI API для анализа решений
- ⬜ Firebase для авторизации
- ⬜ Analytics для отслеживания метрик

## Метрики успеха
1. Обучение
   - Время освоения базовых концепций
   - Процент успешного прохождения квестов
   - Рост характеристик персонажа

2. Вовлеченность
   - Среднее время сессии
   - Частота возвращения
   - Процент завершения историй

## Риски
1. Технические
   - Сложность баланса характеристик
   - Производительность при большом количестве данных
   - Совместимость с разными устройствами

2. Продуктовые
   - Сложность обучения
   - Удержание пользователей
   - Актуальность контента

## Этапы разработки

### 1. MVP (2 месяца) - Текущий этап
- ✅ Базовая система персонажей
  - ✅ 5 типов PM
  - ✅ Основные характеристики
  - ✅ Простая кастомизация
- ✅ Простые диалоги
  - ✅ Базовые сценарии
  - ✅ Линейные диалоги
- ✅ Основной геймплей
  - ✅ Система уровней
  - ⬜ Система опыта
  - ⬜ Базовые достижения

### 2. Alpha (2 месяца)
- ⬜ Расширенная кастомизация
- ⬜ Система достижений
- ✅ Сохранение прогресса

### 3. Beta (2 месяца)
- ⬜ Полный контент
- ⬜ Тестирование баланса
- ⬜ Оптимизация

## Текущий статус
- ✅ Реализована базовая структура проекта
- ✅ Настроен Next.js и основные зависимости
- ✅ Реализована система персонажей
- ✅ Реализована система экипировки
- ✅ Реализована карта уровней с прогрессией
- ✅ Добавлено сохранение прогресса в localStorage
- ✅ Реализован первый уровень с базовым геймплеем

## Следующие шаги
1. ⬜ Реализовать систему опыта и развития персонажа
2. ⬜ Добавить больше контента для уровней
3. ⬜ Реализовать систему достижений
4. ⬜ Улучшить визуальное оформление

## Открытые вопросы
1. Формат интеграции с OpenAI
2. Механика баланса характеристик
3. Система монетизации

## Карта уровней

### Текущая функциональность
- ✅ Отображение уровней на карте
- ✅ Индикация статуса уровней (пройден/текущий/заблокирован)
- ✅ Анимированный UI с использованием Framer Motion
- ✅ Автоматическое открытие следующего уровня после прохождения текущего
- ✅ Сохранение прогресса в localStorage

### Реализованные требования
1. ✅ Адаптивное расположение уровней
   - ✅ Равные отступы между уровнями на экране 13"
   - ✅ Первый и последний уровень имеют одинаковые отступы от краев
   - ✅ Все уровни видны полностью

2. ✅ Управление прогрессом
   - ✅ Добавлена кнопка сброса прогресса
   - ✅ При сбросе:
     * ✅ Все уровни кроме первого блокируются
     * ✅ Инвентарь очищается
     * ✅ Первый уровень становится текущим
   - ✅ Сохранение состояния в localStorage

### Пользовательские сценарии
1. Сброс прогресса
   ```gherkin
   Сценарий: Игрок сбрасывает прогресс
   Дано: Игрок находится на карте уровней
   Когда: Нажимает кнопку "Сбросить прогресс"
   Тогда: Прогресс сбрасывается
   И: Первый уровень становится доступным
   И: Остальные уровни блокируются
   ```

2. Адаптивность
   ```gherkin
   Сценарий: Отображение на MacBook Air 13"
   Дано: Игрок открывает карту на MacBook Air 13"
   Тогда: Все уровни видны полностью
   И: Отступы между уровнями равные
   И: Крайние уровни имеют одинаковые отступы
   ```

3. Прогресс уровней
   ```gherkin
   Сценарий: Игрок завершает уровень
   Дано: Игрок находится на уровне 1
   Когда: Игрок завершает уровень
   Тогда: Уровень 1 отмечается как завершенный
   И: Уровень 2 становится доступным
   И: Игрок возвращается на карту уровней
   ```

[... остальные детали PRD] 