'use client';

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/types/character';
import { LevelProgress } from '@/types/game';

interface LevelMapProps {
  character: Character & { customName: string };
  onLevelSelect: (level: number) => void;
  onBack: () => void;
  levelProgress: LevelProgress[];
}

interface LevelData {
  id: number;
  title: string;
  description: string;
}

const LevelMap: FC<LevelMapProps> = ({ character, onLevelSelect, onBack, levelProgress }) => {
  // Данные об уровнях
  const levelsData: LevelData[] = [
    {
      id: 1,
      title: 'Выбор продукта',
      description: 'Выберите продукт для развития и проанализируйте его потенциал'
    },
    {
      id: 2,
      title: 'Формирование команды',
      description: 'Соберите команду для разработки продукта'
    },
    {
      id: 3,
      title: 'Запуск продукта',
      description: 'Подготовьте и запустите продукт на рынок'
    }
  ];

  // Объединяем данные об уровнях с прогрессом
  const levels = levelsData.map(levelData => {
    const progress = levelProgress.find(p => p.id === levelData.id) || {
      id: levelData.id,
      isCompleted: false,
      isAvailable: levelData.id === 1 // По умолчанию доступен только первый уровень
    };
    
    return {
      ...levelData,
      ...progress
    };
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Карта уровней</h1>
          <div className="flex items-center">
            <img 
              src={character.icon} 
              alt={character.displayName} 
              className="w-10 h-10 object-contain mr-3"
            />
            <span className="font-medium">{character.customName}</span>
            <button 
              onClick={onBack}
              className="ml-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Назад
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col space-y-8">
            {levels.map((level, index) => (
              <div key={level.id} className="relative">
                {/* Линия соединения между уровнями */}
                {index < levels.length - 1 && (
                  <div 
                    className={`absolute left-6 top-16 w-1 h-[calc(100%+2rem)] -z-10 ${
                      level.isCompleted ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  ></div>
                )}
                
                {/* Карточка уровня */}
                <motion.div 
                  className={`flex items-start p-4 rounded-lg ${
                    level.isAvailable 
                      ? level.isCompleted 
                        ? 'bg-green-900/30 border border-green-500 cursor-pointer' 
                        : 'bg-blue-900/30 border border-blue-500 cursor-pointer' 
                      : 'bg-gray-700/50 border border-gray-600 opacity-70 cursor-not-allowed'
                  }`}
                  whileHover={level.isAvailable ? { scale: 1.02 } : {}}
                  whileTap={level.isAvailable ? { scale: 0.98 } : {}}
                  onClick={() => level.isAvailable && onLevelSelect(level.id)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
                    level.isAvailable 
                      ? level.isCompleted 
                        ? 'bg-green-500' 
                        : 'bg-blue-500' 
                      : 'bg-gray-600'
                  }`}>
                    {level.isCompleted ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-white font-bold">{level.id}</span>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-1">{level.title}</h2>
                    <p className="text-gray-300">{level.description}</p>
                    
                    {level.isAvailable && !level.isCompleted && (
                      <motion.button
                        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onLevelSelect(level.id);
                        }}
                      >
                        Начать
                      </motion.button>
                    )}
                    
                    {level.isCompleted && (
                      <motion.button
                        className="mt-3 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-4 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onLevelSelect(level.id);
                        }}
                      >
                        Повторить
                      </motion.button>
                    )}
                    
                    {!level.isAvailable && (
                      <div className="mt-3 flex items-center text-gray-400">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Заблокировано</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelMap;