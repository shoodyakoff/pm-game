import React, { FC, useState } from 'react';
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
}

type Level1Step = 'intro' | 'selection' | 'analysis' | 'summary';

const Level1: FC<Level1Props> = ({ character, inventory, onBack, onComplete }) => {
  const [step, setStep] = useState<Level1Step>('intro');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    audience: '',
    competitors: ''
  });

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setStep('analysis');
  };

  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    setStep('summary');
  };

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

  return (
    <>
      {step === 'intro' && (
        <DialogScene 
          dialogue={ProductIntroDialog} 
          selectedCharacter={character}
          onComplete={() => setStep('selection')}
        />
      )}
      
      {step === 'selection' && (
        <ProductSelection 
          onBack={onBack}
          onProductSelected={handleProductSelect}
        />
      )}
      
      {step === 'analysis' && selectedProduct && (
        <ProductAnalysis 
          character={character}
          product={selectedProduct}
          analysisData={analysisData}
          onAnalysisChange={setAnalysisData}
          onBack={() => setStep('selection')}
          onComplete={() => handleAnalysisComplete(analysisData)}
        />
      )}
      
      {step === 'summary' && selectedProduct && (
        <LevelSummary 
          character={character}
          selectedProduct={selectedProduct}
          analysisData={analysisData}
          onComplete={handleComplete}
          levelName="Выбор продукта"
        />
      )}
    </>
  );
};

export default Level1;