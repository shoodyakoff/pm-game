import { ItemCategory } from '../../types/inventory';

// Позиции для размещения экипировки на персонаже
export const equipmentPositions: Record<ItemCategory, { top: string, left: string }> = {
  hat: { top: '10%', left: '50%' },
  armor: { top: '40%', left: '50%' },
  weapon: { top: '50%', left: '20%' },
  transport: { top: '80%', left: '50%' }
}; 