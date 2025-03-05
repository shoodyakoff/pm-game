import React, { FC, useState, useEffect } from 'react';
import { Character } from '@/types/character';
import { Product, AnalysisData } from '@/types/game';
import { EquippedItems } from '@/types/inventory';
import DialogScene from '../dialogs/DialogScene';
import ProductSelection from './ProductSelection';
import ProductAnalysis from './ProductAnalysis';
import LevelSummary from './LevelSummary';
import ProductIntroDialog from '../dialogs/level1/ProductIntroDialog';

interface Level1Props {
  character: Character & { customName: string };
  inventory: EquippedItems;
  onBack: () => void;
  onComplete: (rewards?: any) => void;
  initialStep?: 'intro' | 'selection' | 'analysis' | 'summary';
}

type Level1Step = 'intro' | 'selection' | 'analysis' | 'summary';

const Level1: FC<Level1Props> = ({ 
  character, 
  inventory, 
  onBack, 
  onComplete,
  initialStep = 'intro'
}) => {
  const [step, setStep] = useState<Level1Step>(initialStep);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    audience: '',
    competitors: ''
  });

  // Обработчик выбора продукта
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setStep('analysis');
  };

  // Обработчик завершения анализа
  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    setStep('summary');
  };

  // Обработчик завершения уровня
  const handleComplete = () => {
    const rewards = {
      item: {
        id: 'mace_analyst',
        name: 'Булава аналитика',
        type: 'weapon'
      },
      skills: ['market_analysis', 'decision_making', 'competitive_analysis']
    };
    
    onComplete(rewards);
  };

  // Получаем диалог с учетом выбранного персонажа
  const getDialog = () => {
    const dialog = { ...ProductIntroDialog };
    
    if (dialog.steps && dialog.steps.length > 1) {
      dialog.steps[1] = {
        ...dialog.steps[1],
        avatar: character.icon
      };
    }
    
    return dialog;
  };

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return (
          <DialogScene 
            dialog={getDialog()}
            onComplete={() => setStep('selection')}
          />
        );
      case 'selection':
        return (
          <ProductSelection 
            character={character}
            onBack={() => setStep('intro')}
            onSelect={handleProductSelect}
          />
        );
      case 'analysis':
        if (selectedProduct) {
          return (
            <ProductAnalysis 
              character={character}
              product={selectedProduct}
              onBack={() => setStep('selection')}
              onComplete={handleAnalysisComplete}
            />
          );
        }
        return null;
      case 'summary':
        if (selectedProduct) {
          return (
            <LevelSummary 
              character={character}
              levelName="level1"
              levelTitle="Выбор продукта"
              skills={[
                { icon: '/icons/target.png', name: 'Анализ рынка', description: 'Способность анализировать рыночные тренды и потребности' },
                { icon: '/icons/strategy.png', name: 'Принятие решений', description: 'Умение принимать обоснованные решения на основе данных' },
                { icon: '/icons/competition.png', name: 'Конкурентный анализ', description: 'Навык оценки конкурентов и их продуктов' }
              ]}
              results={
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Выбранный продукт</h3>
                    <div className="flex items-center">
                      <img src={selectedProduct.image} alt={selectedProduct.title} className="w-16 h-16 object-contain mr-4" />
                      <div>
                        <h4 className="font-bold">{selectedProduct.title}</h4>
                        <p className="text-gray-300">{selectedProduct.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Анализ рынка</h3>
                    <div className="space-y-2">
                      <p><span className="font-bold">Целевая аудитория:</span> {analysisData.audience}</p>
                      <p><span className="font-bold">Конкуренты:</span> {analysisData.competitors}</p>
                    </div>
                  </div>
                </div>
              }
              reward={{
                item: {
                  id: 'analytics-mace',
                  name: 'Булава аналитика',
                  type: 'weapon'
                },
                skills: ['market_analysis', 'decision_making', 'competitive_analysis']
              }}
              onComplete={handleComplete}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {renderStep()}
    </div>
  );
};

export default Level1;