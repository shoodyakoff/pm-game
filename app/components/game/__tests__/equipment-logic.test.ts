import { validateEquipment, calculateStats } from '../equipment-logic';
import { ItemCategory } from '../../../types/game';

describe('Equipment Logic', () => {
  const mockEquipment: Record<ItemCategory, null> = {
    hat: null,
    shirt: null,
    pants: null,
    transport: null
  };

  it('should validate required equipment', () => {
    expect(validateEquipment(mockEquipment)).toBe(false);
  });

  it('should calculate correct stats', () => {
    const stats = calculateStats(mockEquipment);
    expect(stats).toEqual({
      impact: 0,
      leadership: 0,
      technical: 0
    });
  });
}); 