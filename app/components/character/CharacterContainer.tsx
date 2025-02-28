import React, { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '../../types/character';
import EquippedItem from './EquippedItem';
import { ItemCategory, InventoryItem } from '../../types/inventory';

interface CharacterContainerProps {
  character: Character;
  equipment: Record<ItemCategory, InventoryItem | null>;
}

const CharacterContainer: FC<CharacterContainerProps> = ({ character, equipment }) => {
  const hasHelmet = Boolean(equipment.hat);

  return (
    <div className="relative">
      {/* Базовый персонаж (без прически) */}
      <img 
        src={character.baseImage} 
        className="w-auto mx-auto object-contain"
        style={{ maxHeight: '500px' }}
      />
      
      {/* Прическа (показываем только если нет шлема) */}
      <AnimatePresence>
        {!hasHelmet && (
          <motion.img
            src={character.hairImage}
            className="absolute top-0 left-0 w-full h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Экипированные предметы */}
      {Object.entries(equipment).map(([slot, item]) => (
        item && (
          <EquippedItem
            key={slot}
            item={item}
            characterType={character.type}
          />
        )
      ))}
    </div>
  );
};

export default CharacterContainer; 