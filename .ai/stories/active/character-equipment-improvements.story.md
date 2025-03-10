# Система экипировки персонажа

## Статус
✅ Частично реализовано

## Контекст
Реализована базовая система экипировки персонажа с использованием drag & drop. Необходимо улучшить визуализацию экипированных предметов на персонаже.

## Текущая реализация
- ✅ Базовая система drag & drop для экипировки
- ✅ Слоты для разных типов предметов (голова, тело, оружие, транспорт)
- ✅ Визуальная индикация недоступных предметов
- ✅ Расчет характеристик персонажа на основе экипировки
- ✅ Сохранение экипировки в localStorage

## Структура изображений персонажа
1. Базовые части:
   - ✅ Базовое изображение персонажа (character.image)
   - ✅ Иконка персонажа (character.icon)

2. Особенности:
   - ⬜ Прическа должна точно накладываться на голову персонажа
   - ⬜ При надевании шлема прическа скрывается
   - ⬜ Шлем накладывается на лысую версию персонажа

## Порядок слоев (z-index)
1. ✅ Базовое тело (самый нижний слой)
2. ⬜ Голова
3. ⬜ Прическа/Шлем (взаимоисключающие)
4. ✅ Броня
5. ✅ Оружие
6. ✅ Транспорт

## Технический подход
1. Композиция изображений:
   - ✅ Контейнер с position: relative
   - ✅ Все части и предметы position: absolute
   - ✅ Система координат для наложения

2. Управление слоями:
   - ✅ Базовое тело всегда видимо
   - ⬜ Голова всегда поверх тела
   - ⬜ Прическа показывается только если нет шлема
   - ✅ Предметы накладываются согласно z-index

## Задачи
1. [x] Создать структуру компонента с поддержкой составных изображений
2. [x] Реализовать систему наложения частей персонажа
3. [ ] Добавить управление прической/шлемом
4. [x] Настроить позиционирование остальных предметов

## Примечания
- Необходимо учесть пиксельную точность наложения
- Все координаты относительны контейнера персонажа
- Реализовано позиционирование предметов через конфигурацию

## Требования к изображениям
1. Персонаж:
   - ✅ Базовое изображение персонажа
   - ✅ Иконка персонажа
   - ⬜ Изображение прически отдельным файлом

2. Предметы экипировки:
   - ✅ Шлем/головной убор (Шапка стартапера)
   - ✅ Броня/одежда (Броня единорога)
   - ✅ Оружие (Меч решений)
   - ✅ Транспорт (Электрический скутер)

## Функциональные требования
1. Управление прической:
   - ⬜ Если шлем не надет → показывать прическу
   - ⬜ При надевании шлема → скрывать прическу
   - ⬜ Анимация смены прически/шлема

2. Позиционирование предметов:
   - ✅ Учет разных пропорций персонажей
   - ✅ Корректное наложение слоев
   - ✅ Возможность тонкой настройки позиций

3. Слои и порядок отображения:
   - ✅ Базовый персонаж
   - ✅ Шлем
   - ✅ Броня
   - ✅ Оружие
   - ✅ Транспорт

## Технические требования
1. Производительность:
   - ✅ Минимум перерисовок
   - ✅ Оптимизация анимаций

2. Поддержка:
   - ✅ Легкое добавление новых персонажей
   - ✅ Простая настройка позиций предметов
   - ✅ Возможность отладки позиционирования

## Следующие шаги
1. Добавить отдельные изображения для причесок персонажей
2. Реализовать управление прической/шлемом
3. Добавить анимации при экипировке/снятии предметов 