'use client';

import React, { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Character } from '@/types/character';
import { InventoryItem, ItemCategory } from '@/types/inventory';
import { EquippedItems } from '@/types/game';
import { validateEquipment, calculateStats } from './equipment-logic';
import characterEquipmentPositions from '../../config/character-equipment-positions';
import { DraggableItem } from './DraggableItem';
import { items } from '@/data/items';

// Создаем простой эмиттер событий для тестов
class TestEventEmitter {
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

// Создаем один экземпляр эмиттера для всего приложения
// Используем window для хранения глобального экземпляра
declare global {
  interface Window {
    _testEventEmitter?: TestEventEmitter;
  }
}

// Инициализируем эмиттер только один раз
if (typeof window !== 'undefined') {
  if (!window._testEventEmitter) {
    window._testEventEmitter = new TestEventEmitter();
  }
}

// Получаем доступ к эмиттеру
const getTestEventEmitter = (): TestEventEmitter => {
  if (typeof window !== 'undefined' && window._testEventEmitter) {
    return window._testEventEmitter;
  }
  return new TestEventEmitter(); // Для SSR
};

interface CharacterEquipmentProps {
  character: Character & { customName: string };
  onComplete: (equippedItems: EquippedItems) => void;
  onBack: () => void;
  onContinue: () => void;
  onChangeCharacter: () => void;
  unlockedSlots?: number; // Количество разблокированных слотов (по умолчанию 2)
}

// Компонент для отображения экипировки на персонаже
const EquippedItemsDisplay: FC<{
  character: Character;
  equippedItems: Record<ItemCategory, InventoryItem | null>;
}> = ({ character, equippedItems }) => {
  const positions = characterEquipmentPositions[character.type] || {};

  return (
    <div className="relative h-full w-full">
      {/* Изображение персонажа */}
      <img 
        src={character.image} 
        alt={character.displayName} 
        className="h-full w-auto mx-auto"
      />
      
      {/* Отображение экипированных предметов */}
      {Object.entries(equippedItems).map(([category, item]) => {
        if (!item) return null;
        
        const categoryKey = category as ItemCategory;
        const position = positions[categoryKey] || { top: '0%', left: '0%', scale: 1, zIndex: 1 };
        
        return (
          <div 
            key={category}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              top: position.top,
              left: position.left,
              zIndex: position.zIndex,
              transform: `translate(-50%, -50%) scale(${position.scale})`
            }}
            data-testid={`equipped-${category}`}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-16 h-16 object-contain"
            />
          </div>
        );
      })}
    </div>
  );
};

// Компонент для перетаскиваемого предмета
interface DndDropEvent extends CustomEvent {
  detail: InventoryItem;
}

interface DropZoneProps {
  type: keyof EquippedItems;
  onDrop: (item: InventoryItem) => void;
  children: React.ReactNode;
  isUnlocked: boolean;
}

// Компонент зоны для перетаскивания предметов
const DropZone: FC<DropZoneProps> = ({ type, onDrop, children, isUnlocked }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: type,
    drop: (item: InventoryItem) => {
      onDrop(item);
    },
    canDrop: () => isUnlocked,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });
  
  return (
    <div 
      ref={drop} 
      className={`relative border-2 rounded-lg p-2 min-h-[80px] flex items-center justify-center
        ${isUnlocked 
          ? isOver && canDrop 
            ? 'border-green-500 bg-green-500/20' 
            : 'border-gray-600 hover:border-blue-500'
          : 'border-gray-700 bg-gray-800/50 cursor-not-allowed'
        }`}
    >
      {children}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      )}
    </div>
  );
};

const CharacterEquipment: FC<CharacterEquipmentProps> = ({
  character,
  onComplete,
  onBack,
  onContinue,
  onChangeCharacter,
  unlockedSlots = 2
}) => {
  // Состояние для экипированных предметов
  const [equippedItems, setEquippedItems] = useState<EquippedItems>({
    head: null,
    body: null,
    weapon: null,
    transport: null
  });
  
  // Состояние для статистики персонажа
  const [stats, setStats] = useState({
    intelligence: 0,
    charisma: 0,
    energy: 0,
    luck: 0
  });
  
  // Состояние для проверки валидности экипировки
  const [isValid, setIsValid] = useState(false);
  
  // Получаем доступные предметы в зависимости от уровня персонажа
  const characterLevel = 1; // Здесь должен быть уровень персонажа из пропсов или контекста
  
  // Обновление статистики при изменении экипировки
  useEffect(() => {
    const newStats = calculateStats(character, equippedItems);
    setStats(newStats);
    
    setIsValid(validateEquipment(equippedItems));
  }, [character, equippedItems]);
  
  // Функция для экипировки предмета
  const handleEquipItem = (slot: keyof EquippedItems, item: InventoryItem) => {
    setEquippedItems(prev => ({
      ...prev,
      [slot]: item
    }));
  };
  
  // Функция для снятия предмета
  const handleUnequipItem = (slot: keyof EquippedItems) => {
    setEquippedItems(prev => ({
      ...prev,
      [slot]: null
    }));
  };
  
  // Получение всех доступных предметов для инвентаря
  const availableItems = items.filter(item => {
    // Проверяем, не экипирован ли уже этот предмет
    const isEquipped = Object.values(equippedItems).some(
      equippedItem => equippedItem && equippedItem.id === item.id
    );
    
    return !isEquipped;
  });
  
  // Проверка, разблокирован ли слот
  const isSlotUnlocked = (slotIndex: number) => {
    return slotIndex < unlockedSlots;
  };
  
  // Функция для завершения экипировки
  const handleComplete = () => {
    onComplete(equippedItems);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Экипировка персонажа</h1>
          <div className="flex space-x-4">
            <button 
              onClick={onBack}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Назад
            </button>
            <motion.button
              whileHover={isValid ? { scale: 1.05 } : {}}
              whileTap={isValid ? { scale: 0.95 } : {}}
              className={`font-bold py-2 px-4 rounded-lg transition-colors ${
                isValid 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              onClick={isValid ? onContinue : undefined}
              disabled={!isValid}
            >
              Продолжить
            </motion.button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - персонаж */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">{character.customName}</h2>
            <div className="h-96 mb-4">
              <EquippedItemsDisplay 
                character={character}
                equippedItems={equippedItems}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Интеллект:</span>
                <span>{stats.intelligence}</span>
              </div>
              <div className="flex justify-between">
                <span>Харизма:</span>
                <span>{stats.charisma}</span>
              </div>
              <div className="flex justify-between">
                <span>Энергия:</span>
                <span>{stats.energy}</span>
              </div>
              <div className="flex justify-between">
                <span>Удача:</span>
                <span>{stats.luck}</span>
              </div>
            </div>
          </div>
          
          {/* Средняя колонка - слоты экипировки */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Экипировка</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg text-blue-300 mb-2">Головной убор</h3>
                <DropZone 
                  type="head" 
                  onDrop={(item) => handleEquipItem('head', item)}
                  isUnlocked={isSlotUnlocked(0)}
                >
                  {equippedItems.head ? (
                    <div className="flex items-center w-full">
                      <img 
                        src={equippedItems.head.image} 
                        alt={equippedItems.head.title} 
                        className="w-12 h-12 object-contain mr-2"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold">{equippedItems.head.title}</h4>
                        <p className="text-gray-300 text-sm">{equippedItems.head.description}</p>
                      </div>
                      <button 
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleUnequipItem('head')}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-400">Перетащите сюда головной убор</p>
                  )}
                </DropZone>
              </div>
              
              <div>
                <h3 className="text-lg text-blue-300 mb-2">Броня</h3>
                <DropZone 
                  type="body" 
                  onDrop={(item) => handleEquipItem('body', item)}
                  isUnlocked={isSlotUnlocked(1)}
                >
                  {equippedItems.body ? (
                    <div className="flex items-center w-full">
                      <img 
                        src={equippedItems.body.image} 
                        alt={equippedItems.body.title} 
                        className="w-12 h-12 object-contain mr-2"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold">{equippedItems.body.title}</h4>
                        <p className="text-gray-300 text-sm">{equippedItems.body.description}</p>
                      </div>
                      <button 
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleUnequipItem('body')}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-400">Перетащите сюда броню</p>
                  )}
                </DropZone>
              </div>
              
              <div>
                <h3 className="text-lg text-blue-300 mb-2">Оружие</h3>
                <DropZone 
                  type="weapon" 
                  onDrop={(item) => handleEquipItem('weapon', item)}
                  isUnlocked={isSlotUnlocked(2)}
                >
                  {equippedItems.weapon ? (
                    <div className="flex items-center w-full">
                      <img 
                        src={equippedItems.weapon.image} 
                        alt={equippedItems.weapon.title} 
                        className="w-12 h-12 object-contain mr-2"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold">{equippedItems.weapon.title}</h4>
                        <p className="text-gray-300 text-sm">{equippedItems.weapon.description}</p>
                      </div>
                      <button 
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleUnequipItem('weapon')}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-400">Перетащите сюда оружие</p>
                  )}
                </DropZone>
              </div>
              
              <div>
                <h3 className="text-lg text-blue-300 mb-2">Транспорт</h3>
                <DropZone 
                  type="transport" 
                  onDrop={(item) => handleEquipItem('transport', item)}
                  isUnlocked={isSlotUnlocked(3)}
                >
                  {equippedItems.transport ? (
                    <div className="flex items-center w-full">
                      <img 
                        src={equippedItems.transport.image} 
                        alt={equippedItems.transport.title} 
                        className="w-12 h-12 object-contain mr-2"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold">{equippedItems.transport.title}</h4>
                        <p className="text-gray-300 text-sm">{equippedItems.transport.description}</p>
                      </div>
                      <button 
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleUnequipItem('transport')}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-400">Перетащите сюда транспорт</p>
                  )}
                </DropZone>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-center mb-4">
                {isValid 
                  ? "Экипировка готова!" 
                  : "Необходимо экипировать все доступные слоты"}
              </p>
            </div>
          </div>
          
          {/* Правая колонка - инвентарь */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Инвентарь</h2>
            <div className="space-y-6">
              {availableItems.map((item) => (
                <DraggableItem 
                  key={item.id} 
                  item={item}
                  isDisabled={
                    (item.category === 'head' && !isSlotUnlocked(0)) ||
                    (item.category === 'body' && !isSlotUnlocked(1)) ||
                    (item.category === 'weapon' && !isSlotUnlocked(2)) ||
                    (item.category === 'transport' && !isSlotUnlocked(3))
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterEquipment;