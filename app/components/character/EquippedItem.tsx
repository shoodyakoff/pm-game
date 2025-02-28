import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { InventoryItem } from '../../types/inventory';
import { CHARACTER_EQUIPMENT_POSITIONS } from '../../config/character-equipment-positions';

interface EquippedItemProps {
  item: InventoryItem;
  characterType: string;
}

const EquippedItem: FC<EquippedItemProps> = ({ item, characterType }) => {
  const position = CHARACTER_EQUIPMENT_POSITIONS[characterType][item.category];

  return (
    <motion.div
      className="absolute transform -translate-x-1/2"
      style={{
        top: position.top,
        left: position.left,
        transform: `translate(-50%, 0) scale(${position.scale})`
      }}
    >
      <img src={item.image} alt={item.title} />
    </motion.div>
  );
};

export default EquippedItem; 