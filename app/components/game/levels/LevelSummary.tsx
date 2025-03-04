import React from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/types/character';
import { Product, AnalysisData } from '@/types/game';

interface LevelSummaryProps {
  character: Character & { customName: string };
  selectedProduct: Product;
  analysisData: AnalysisData;
  onComplete: () => void;
  levelName: string;
}

const LevelSummary: React.FC<LevelSummaryProps> = ({
  character,
  selectedProduct,
  analysisData,
  onComplete,
  levelName = "Выбор продукта"
}) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4">
      {/* Заголовок уровня */}
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Итоги уровня "{levelName}"
      </h1>
      
      <div className="max-w-6xl w-full grid grid-cols-12 gap-8">
        {/* Левая колонка с персонажем - 1/3 экрана */}
        <div className="col-span-4 flex flex-col items-center">
          <div className="w-full bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <img 
              src={character.image} 
              alt={character.customName} 
              className="w-full max-h-[350px] object-contain mb-4"
            />
            <h2 className="text-2xl font-bold text-white">
              {character.customName}
            </h2>
            <p className="text-gray-400">
              Уровень 1
            </p>
          </div>
        </div>
        
        {/* Правая колонка с результатами - 2/3 экрана */}
        <div className="col-span-8 flex flex-col space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Выбор продукта
            </h2>
            
            <div className="flex items-center mb-4">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.title} 
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-xl font-bold text-blue-400">
                  {selectedProduct.title}
                </h3>
                <p className="text-gray-300">
                  {selectedProduct.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Полученные навыки
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Навык 1: Анализ рынка */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                    <div className="w-[40px] h-[40px] flex items-center justify-center">
                      <img 
                        src="/icons/target.png" 
                        alt="Анализ" 
                        className="w-[40px] h-[40px] object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-blue-400">
                    Анализ рынка
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Способность анализировать рыночные тренды и потребности пользователей
                </p>
              </div>
              
              {/* Навык 2: Принятие решений */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                    <div className="w-[40px] h-[40px] flex items-center justify-center">
                      <img 
                        src="/icons/strategy.png" 
                        alt="Решения" 
                        className="w-[40px] h-[40px] object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-blue-400">
                    Принятие решений
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Умение принимать обоснованные решения на основе данных
                </p>
              </div>
              
              {/* Навык 3: Конкурентный анализ */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                    <div className="w-[40px] h-[40px] flex items-center justify-center">
                      <img 
                        src="/icons/competition.png" 
                        alt="Конкуренция" 
                        className="w-[40px] h-[40px] object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-blue-400">
                    Конкурентный анализ
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Способность оценивать конкурентов и находить уникальные преимущества продукта
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Анализ рынка
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-blue-400 mb-2">
                  Целевая аудитория:
                </h3>
                <p className="text-gray-300">
                  {analysisData.audience || "Молодые профессионалы 25-35 лет, активно использующие технологии"}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-blue-400 mb-2">
                  Конкуренты:
                </h3>
                <p className="text-gray-300">
                  {analysisData.competitors || "Существующие решения на рынке: CompetitorA, CompetitorB, CompetitorC"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Награда
            </h2>
            
            <div className="flex items-center">
              <img 
                src="/items/rewards/mace_analyst.png" 
                alt="Булава аналитика" 
                className="w-20 h-20 object-contain mr-4"
              />
              <div>
                <h3 className="text-xl font-bold text-yellow-400">
                  Булава аналитика
                </h3>
                <p className="text-gray-300">
                  Мощное оружие, позволяющее разбивать сложные проблемы на простые компоненты и находить оптимальные решения. Повышает точность анализа на 15%.
                </p>
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors self-center"
            onClick={onComplete}
          >
            Продолжить
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LevelSummary; 