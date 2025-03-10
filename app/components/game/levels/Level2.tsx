import React from 'react';
import { Character } from '../../../types/character';
import { EquippedItems, LevelResult } from '../../../types/game';

interface Level2Props {
  character: Character & { customName: string };
  inventory: EquippedItems;
  onBack: () => void;
  onComplete: (result: LevelResult) => void;
}

export default function Level2({ character, inventory, onBack, onComplete }: Level2Props) {
  const handleComplete = () => {
    onComplete({
      completed: true,
      score: 100,
      analysis: {
        audience: '',
        competitors: ''
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900" data-testid="level2">
      <h1>Уровень 2</h1>
      <button 
        data-testid="complete-level"
        className="hidden test-only absolute bottom-4 right-4 bg-blue-500 px-4 py-2 rounded"
        onClick={handleComplete}
      >
        Завершить уровень
      </button>
    </div>
  );
} 