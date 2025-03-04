'use client';

import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import { InventoryItem } from '@/types/inventory';

interface DraggableItemProps {
  item: InventoryItem;
  isDisabled?: boolean;
}

export const DraggableItem: FC<DraggableItemProps> = ({ item, isDisabled = false }) => {
  const [{ isDragging }, drag] = useDrag({
    type: item.category,
    item: () => item,
    canDrag: !isDisabled,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      className={`relative bg-gray-700 rounded-lg p-3 flex items-center cursor-${isDisabled ? 'not-allowed' : 'grab'} transition-opacity`}
      style={{ opacity: isDragging ? 0.5 : isDisabled ? 0.7 : 1 }}
      data-testid={`draggable-item-${item.id}`}
    >
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-12 h-12 object-contain mr-3"
      />
      <div className="flex-1">
        <h3 className="text-white font-bold">{item.title}</h3>
        <p className="text-gray-300 text-sm">{item.description}</p>
        {item.stats && (
          <div className="mt-1 flex flex-wrap gap-1">
            {Object.entries(item.stats).map(([stat, value]) => (
              <span 
                key={stat} 
                className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300"
              >
                {stat}: +{value}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {isDisabled && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
          <span className="text-white font-medium bg-red-500/80 px-2 py-1 rounded">Недоступно</span>
        </div>
      )}
    </div>
  );
};

export default DraggableItem;