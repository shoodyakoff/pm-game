import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { InventoryItem, ItemCategory } from '../../types/game';

interface DraggableItemProps {
  item: InventoryItem;
  category: ItemCategory;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ item, category }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { ...item, type: 'ITEM', category },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        console.log('Item dropped:', item);
      }
    }
  }), [item, category]);

  return (
    <motion.div
      ref={drag}
      data-testid={`draggable-${item.id}`}
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