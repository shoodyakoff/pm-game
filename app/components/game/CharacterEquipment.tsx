'use client';

import { FC, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Character, InventoryItem, ItemCategory } from '../../types/game';
import { testEventEmitter } from '../../testing/test-utils/EventEmitter';

interface CharacterEquipmentProps {
  character: Character;
  onComplete: (equippedItems: EquippedItems) => void;
  onBack: () => void;
  onContinue: () => void;
}

interface EquippedItems {
  hat: InventoryItem | null;
  shirt: InventoryItem | null;
  pants: InventoryItem | null;
  transport: InventoryItem | null;
}

interface DndDropEvent extends CustomEvent {
  detail: InventoryItem;
}

const items: Record<ItemCategory, InventoryItem> = {
  hat: { 
    id: 'hat',
    image: "/items/hat_startup.png", 
    title: "Шапка стартапера", 
    category: 'hat' 
  },
  shirt: { 
    id: 'shirt',
    image: "/items/shirt_unicorn.png", 
    title: "Кольчуга менеджера", 
    category: 'shirt' 
  },
  pants: { 
    id: 'pants',
    image: "/items/male.png", 
    title: "Оружие", 
    category: 'pants' 
  },
  transport: { 
    id: 'transport',
    image: "/items/scooter_electric.png", 
    title: "Электроягуар", 
    category: 'transport' 
  }
};

const DraggableItem: FC<{
  item: InventoryItem;
  category: ItemCategory;
}> = ({ item, category }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { ...item, type: 'ITEM', category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [item, category]);

  return (
    <motion.div 
      ref={drag}
      data-testid={`draggable-${item.id}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-800/50 p-4 rounded-xl cursor-move"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-24 object-contain mb-2"
      />
      <p className="text-center text-white">{item.title}</p>
    </motion.div>
  );
};

export const CharacterEquipment: FC<CharacterEquipmentProps> = ({
  character,
  onComplete,
  onBack,
  onContinue
}) => {
  const [equippedItems, setEquippedItems] = useState<EquippedItems>({
    hat: null,
    shirt: null,
    pants: null,
    transport: null
  });
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleEquip = useCallback((category: ItemCategory, item: InventoryItem) => {
    const newItems = { ...equippedItems, [category]: item };
    setEquippedItems(newItems);
    onComplete(newItems);
  }, [equippedItems, onComplete]);

  const handleUnequip = useCallback((category: ItemCategory) => {
    const newItems = { ...equippedItems, [category]: null };
    setEquippedItems(newItems);
    onComplete(newItems);
  }, [equippedItems, onComplete]);

  const handleClick = useCallback((equippedItem: InventoryItem) => {
    handleUnequip(equippedItem.category);
  }, [handleUnequip]);

  const handleHover = useCallback((item: InventoryItem) => {
    setSelectedItem(item);
  }, []);

  const handleContinue = useCallback(() => {
    if (Object.values(equippedItems).some(item => item)) {
      onComplete(equippedItems);
      onContinue();
    }
  }, [equippedItems, onComplete, onContinue]);

  const [, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item: InventoryItem & { type: string }) => {
      handleEquip(item.category, item);
    }
  }), [handleEquip]);

  useEffect(() => {
    const handler = (e: { detail: any }) => {
      const item = e.detail;
      if (item && item.category) {
        handleEquip(item.category, item);
      }
    };

    if (process.env.NODE_ENV === 'test') {
      testEventEmitter.addEventListener('dnd-drop', handler);
      return () => testEventEmitter.removeEventListener('dnd-drop', handler);
    } else {
      const domHandler = (e: DndDropEvent) => handler({ detail: e.detail });
      document.addEventListener('dnd-drop', domHandler as EventListener);
      return () => document.removeEventListener('dnd-drop', domHandler as EventListener);
    }
  }, [handleEquip]);

  return (
    <div className="min-h-screen bg-[#1a1f2e] p-8">
      <div className="flex gap-8 h-full">
        {/* Секция с одеждой для надевания */}
        <div className="w-1/3">
          <h3 className="text-xl font-bold mb-6 text-white">
            Доступная одежда
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(items).map(([category, item]) => (
              <div 
                key={category}
                data-testid={`item-container-${category}`}
                onMouseEnter={() => handleHover(item)}
                onMouseLeave={() => setSelectedItem(null)}
              >
                <DraggableItem 
                  item={item} 
                  category={category as ItemCategory} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Секция с персонажем */}
        <div 
          ref={drop} 
          className="w-1/3 relative" 
          data-testid="drop-zone"
          data-drop-callback={`handleEquip(item.category, item)`}
        >
          <div className="relative mt-6 bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm min-h-[600px]">
            <motion.img 
              src={character.image}
              alt={character.name}
              className="h-full w-auto mx-auto object-contain"
              style={{ 
                maxHeight: '500px',
                display: 'block'
              }}
            />
            {Object.entries(equippedItems).map(([slot, item]) => (
              <div key={slot} data-testid={`slot-${slot}`}>
                {item && (
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className={`absolute ${
                      slot === 'hat' ? 'top-[10%]' :
                      slot === 'shirt' ? 'top-[30%]' :
                      slot === 'pants' ? 'top-[50%]' :
                      'bottom-[5%]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Секция с надетой одеждой */}
        <div className="w-1/3 bg-gray-800/50 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-6 text-white">Экипировка</h3>
          <div className="space-y-4">
            {Object.entries(equippedItems).map(([slot, item]) => (
              <div 
                key={slot}
                data-testid={`equipped-${slot}`}
                className="bg-gray-700/50 p-4 rounded-lg cursor-pointer"
                onClick={() => item && handleUnequip(item.category)}
              >
                {item ? (
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-gray-400">{slot}</p>
                    </div>
                  </div>
                ) : (
                  <div data-testid={`empty-${slot}-slot`}>Пустой слот</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Навигация */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gray-700 rounded-lg font-bold text-white"
          onClick={onBack}
        >
          Назад
        </motion.button>
        <motion.button
          onClick={handleContinue}
          className={`px-8 py-3 rounded-lg font-bold text-white ${
            Object.values(equippedItems).some(item => item) 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-gray-700 cursor-not-allowed'
          }`}
          disabled={!Object.values(equippedItems).some(item => item)}
        >
          Продолжить
        </motion.button>
      </div>
    </div>
  );
};