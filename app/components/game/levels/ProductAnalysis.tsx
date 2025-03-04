import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/types/character';
import { Product, AnalysisData } from '@/types/game';

interface ProductAnalysisProps {
  character: Character & { customName: string };
  product: Product;
  analysisData: AnalysisData;
  onAnalysisChange: (data: AnalysisData) => void;
  onBack: () => void;
  onComplete: () => void;
}

const ProductAnalysis: FC<ProductAnalysisProps> = ({
  character,
  product,
  analysisData,
  onAnalysisChange,
  onBack,
  onComplete
}) => {
  const [errors, setErrors] = useState<{
    audience?: string;
    competitors?: string;
  }>({});

  const handleSubmit = () => {
    const newErrors: {
      audience?: string;
      competitors?: string;
    } = {};

    if (!analysisData.audience || analysisData.audience.length < 10) {
      newErrors.audience = 'Пожалуйста, напишите более подробный анализ аудитории (минимум 10 символов)';
    }

    if (!analysisData.competitors || analysisData.competitors.length < 10) {
      newErrors.competitors = 'Пожалуйста, напишите более подробный анализ конкурентов (минимум 10 символов)';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col p-4">
      <div className="max-w-4xl mx-auto w-full bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            className="text-blue-400 hover:text-blue-300 flex items-center"
            onClick={onBack}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </button>
          
          <h1 className="text-2xl font-bold text-white">Анализ продукта</h1>
          
          <div className="w-20"></div> {/* Пустой div для выравнивания */}
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-4">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div>
              <h2 className="text-xl font-bold text-blue-400">{product.title}</h2>
              <p className="text-gray-300">{product.description}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-bold text-white mb-2">
              Целевая аудитория:
            </label>
            <textarea
              className={`w-full bg-gray-700 text-white rounded-lg p-3 min-h-[100px] ${errors.audience ? 'border-2 border-red-500' : 'border border-gray-600'}`}
              placeholder="Опишите целевую аудиторию продукта..."
              value={analysisData.audience}
              onChange={(e) => onAnalysisChange({ ...analysisData, audience: e.target.value })}
            />
            {errors.audience && (
              <p className="text-red-500 mt-1">{errors.audience}</p>
            )}
          </div>
          
          <div>
            <label className="block text-lg font-bold text-white mb-2">
              Конкуренты:
            </label>
            <textarea
              className={`w-full bg-gray-700 text-white rounded-lg p-3 min-h-[100px] ${errors.competitors ? 'border-2 border-red-500' : 'border border-gray-600'}`}
              placeholder="Опишите основных конкурентов и их решения..."
              value={analysisData.competitors}
              onChange={(e) => onAnalysisChange({ ...analysisData, competitors: e.target.value })}
            />
            {errors.competitors && (
              <p className="text-red-500 mt-1">{errors.competitors}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            onClick={handleSubmit}
          >
            Завершить анализ
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalysis;