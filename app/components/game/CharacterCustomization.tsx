'use client';

import { FC, useEffect } from 'react';
import { motion } from "framer-motion";
import { useDrag, useDrop } from "react-dnd";
import { Character, InventoryItem, ItemCategory, DragItem } from '../../types/game';

interface CharacterCustomizationProps {
  items: Record<ItemCategory, InventoryItem>;
  selectedCharacter: Character;
  equippedItems: Record<ItemCategory, InventoryItem | null>;
  handleEquip: (category: ItemCategory, item: DragItem | null) => void;
  onComplete: (character: Character) => void;
}

interface DraggableItemProps {
  item: InventoryItem;
  category: ItemCategory;
}

const DraggableItem: FC<DraggableItemProps> = ({ item, category }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { ...item, type: 'ITEM' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <motion.div
      ref={drag}
      className={`relative p-2 bg-gray-800 rounded-lg cursor-pointer ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      whileHover={{ scale: 1.05 }}
    >
      <img 
        src={item.image} 
        alt={item.title}
        className="w-20 h-20 object-contain"
      />
      <p className="text-sm text-center mt-1">{item.title}</p>
    </motion.div>
  );
};

const CharacterCustomization: FC<CharacterCustomizationProps> = ({
  items,
  selectedCharacter,
  equippedItems,
  handleEquip,
  onComplete
}) => {
  useEffect(() => {
    console.log('CharacterCustomization received items:', items);
    console.log('Items keys:', Object.keys(items));
  }, [items]);

  // Изменяем проверку на более строгую
  if (!items || typeof items !== 'object' || Object.keys(items).length === 0) {
    console.error('No items provided to CharacterCustomization', { items });
    return <div className="p-4 text-red-500">Loading items...</div>;
  }

  useEffect(() => {
    console.log('CharacterCustomization mounted with items:', items);
    console.log('Selected character:', selectedCharacter);
    console.log('Equipped items:', equippedItems);
  }, [items, selectedCharacter, equippedItems]);

  const handleUnequip = (category: ItemCategory): void => {
    handleEquip(category, null);
  };

  const [, drop] = useDrop<DragItem, void, {}>(() => ({
    accept: 'ITEM',
    drop: (item) => {
      handleEquip(item.category, item);
    }
  }));

  if (!items || Object.keys(items).length === 0) {
    console.error('No items provided to CharacterCustomization');
    return <div>Loading items...</div>;
  }

  return (
    <div className="flex justify-between p-8 h-screen" ref={drop}>
      <div className="w-1/4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Инвентарь</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(items).map((category) => (
            <DraggableItem 
              key={items[category as ItemCategory].id}
              item={items[category as ItemCategory]}
              category={category as ItemCategory}
            />
          ))}
        </div>
      </div>
      
      <div className="flex-1 relative">
        <div className="absolute left-1/2 bottom-0 w-full h-full">
          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            className="h-full w-auto mx-auto"
          />
          {Object.keys(equippedItems).map((category) => {
            const item = equippedItems[category as ItemCategory];
            return item ? (
              <div 
                key={category}
                className="absolute transform -translate-x-1/2 cursor-pointer"
                onClick={() => handleUnequip(category as ItemCategory)}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterCustomization;