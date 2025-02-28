import { useState } from 'react';
import DialogScene from '../dialogs/DialogScene';
import { productIntroDialogue } from '../dialogs/level1/ProductIntroDialog';
import ProductSelection from './ProductSelection';
import ProductAnalysis from './ProductAnalysis';
import LevelSummary from '../LevelSummary';
import { 
  Product, 
  Character, 
  LevelProgress, 
  AnalysisData,
  EquippedItems,
  LevelResult 
} from '../../../types/game';

interface Level1Props {
  character: Character;
  inventory: EquippedItems;
  onBack: () => void;
  onComplete: (result: LevelResult) => void;
}

type Level1Step = 'intro' | 'selection' | 'analysis' | 'summary';

export default function Level1({ character, inventory, onBack, onComplete }: Level1Props) {
  const [step, setStep] = useState<Level1Step>('intro');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    audience: '',
    competitors: ''
  });

  const skills = [
    {
      icon: "/icons/target.png",
      name: "Анализ аудитории",
      description: "Определение и сегментация целевой аудитории продукта"
    },
    {
      icon: "/icons/competition.png",
      name: "Анализ конкурентов",
      description: "Исследование рынка и конкурентной среды"
    },
    {
      icon: "/icons/strategy.png",
      name: "Стратегическое мышление",
      description: "Формирование рекомендаций на основе анализа"
    }
  ];

  const results = (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="font-bold text-white mb-2">Выбранный продукт</h3>
        <p className="text-gray-300">{selectedProduct?.title}</p>
      </div>
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="font-bold text-white mb-2">Анализ аудитории</h3>
        <p className="text-gray-300">{analysisData.audience}</p>
      </div>
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="font-bold text-white mb-2">Анализ конкурентов</h3>
        <p className="text-gray-300">{analysisData.competitors}</p>
      </div>
    </div>
  );

  const reward = {
    id: "mace_analyst",
    name: "Булава аналитика",
    description: "Помогает разбивать сложные задачи на простые части",
    imagePath: "/items/rewards/mace_analyst.png"
  };

  if (!character) {
    throw new Error('Character is required for Level 1');
  }

  const renderStep = () => {
    try {
      switch(step) {
        case 'intro':
          return (
            <DialogScene
              dialogue={productIntroDialogue}
              selectedCharacter={character}
              onComplete={() => setStep('selection')}
            />
          );
        case 'selection':
          return (
            <ProductSelection
              onSelect={(product) => {
                if (!product) return;
                setSelectedProduct(product);
                setStep('analysis');
              }}
              selectedCharacter={character}
            />
          );
        case 'analysis':
          if (!selectedProduct) {
            setStep('selection');
            return null;
          }
          return (
            <ProductAnalysis
              onBack={() => setStep('selection')}
              selectedProduct={selectedProduct}
              selectedCharacter={character}
              analysisData={analysisData}
              onAnalysisChange={setAnalysisData}
              onComplete={() => setStep('summary')}
            />
          );
        case 'summary':
          if (!selectedProduct) {
            setStep('selection');
            return null;
          }
          return (
            <LevelSummary
              character={character}
              levelNumber={1}
              levelTitle="Чему научились"
              skills={skills}
              results={results}
              reward={reward}
              onComplete={() => onComplete({
                selectedProduct,
                completed: true,
                score: 100,
                analysis: analysisData
              })}
            />
          );
        default:
          console.error('Неизвестный шаг:', step);
          return null;
      }
    } catch (error) {
      console.error('Error in Level1:', error);
      return null;
    }
  };

  const handleComplete = () => {
    onComplete({
      selectedProduct,
      completed: true,
      score: 100,
      analysis: analysisData
    });
  };

  return (
    <div className="min-h-screen bg-gray-900" data-testid="level1">
      {renderStep()}
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