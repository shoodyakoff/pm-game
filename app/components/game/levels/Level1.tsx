import { useState } from 'react';
import DialogScene from '../dialogs/DialogScene';
import { productIntroDialogue } from '../dialogs/level1/ProductIntroDialog';
import ProductSelection from './ProductSelection';
import ProductAnalysis from './ProductAnalysis';
import { Product, Character, LevelProgress } from '../../../types/game';

interface Level1Props {
  selectedCharacter: Character;
  onComplete: (progress: LevelProgress) => void;
}

export default function Level1({ selectedCharacter, onComplete }: Level1Props) {
  const [step, setStep] = useState('intro');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  if (!selectedCharacter) {
    throw new Error('Character is required for Level 1');
  }

  const renderStep = () => {
    try {
      switch(step) {
        case 'intro':
          return (
            <DialogScene
              dialogue={productIntroDialogue}
              selectedCharacter={selectedCharacter}
              onComplete={() => setStep('selection')}
            />
          );
        case 'selection':
          return (
            <ProductSelection
              onSelect={(product) => {
                setSelectedProduct(product);
                setStep('analysis');
              }}
            />
          );
        case 'analysis':
          return selectedProduct ? (
            <ProductAnalysis
              product={selectedProduct}
              onComplete={(score) => {
                onComplete({
                  selectedProduct,
                  completed: true,
                  score
                });
              }}
            />
          ) : null;
        default:
          throw new Error(`Unknown step: ${step}`);
      }
    } catch (error) {
      console.error('Error in Level1:', error);
      return (
        <div className="text-red-500 p-4">
          Произошла ошибка. Пожалуйста, перезагрузите игру.
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {renderStep()}
    </div>
  );
}