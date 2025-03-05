'use client';

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/types/character';
import { LevelProgress } from '@/types/game';
import { EquippedItems } from '@/types/inventory';

interface LevelMapProps {
  character: Character & { customName: string };
  inventory: EquippedItems;
  onLevelSelect: (level: string) => void;
  onBack: () => void;
  levelProgress: LevelProgress;
}

interface LevelData {
  id: string;
  title: string;
  description: string;
}

const levelsData: LevelData[] = [
  {
    id: 'level1',
    title: 'Выбор продукта',
    description: 'Выберите продукт для развития и проанализируйте его потенциал'
  },
  {
    id: 'level2',
    title: 'Формирование команды',
    description: 'Соберите команду для разработки продукта'
  },
  {
    id: 'level3',
    title: 'Запуск продукта',
    description: 'Подготовьте и запустите продукт на рынок'
  }
];

const LevelMap: FC<LevelMapProps> = ({ 
  character, 
  inventory, 
  onLevelSelect, 
  onBack,
  levelProgress 
}) => {
  if (!character) {
    return null;
  }

  // Объединяем данные об уровнях с прогрессом
  const levels = levelsData.map(levelData => {
    const status = levelProgress[levelData.id];
    return {
      ...levelData,
      isCompleted: status === 'completed',
      isAvailable: status === 'available' || status === 'completed'
    };
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={onBack}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Назад
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Карта уровней</h1>
            <p className="text-xl">Выберите уровень, {character.customName}</p>
          </div>
          <div className="w-24"></div> {/* Пустой блок для выравнивания */}
        </div>
        
        <div className="grid grid-cols-1 gap-8 mt-8">
          {levels.map((level) => (
            <motion.div
              key={level.id}
              whileHover={{ scale: level.isAvailable ? 1.02 : 1 }}
              className={`
                p-6 rounded-lg shadow-lg relative overflow-hidden
                ${level.isCompleted ? 'bg-green-800' : level.isAvailable ? 'bg-blue-800' : 'bg-gray-700 opacity-60'}
                ${level.isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
              onClick={() => level.isAvailable && onLevelSelect(level.id)}
            >
              {level.isCompleted && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  Завершено
                </div>
              )}
              
              <h2 className="text-2xl font-bold mb-2">{level.title}</h2>
              <p className="text-gray-300 mb-4">{level.description}</p>
              
              {!level.isAvailable && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Заблокировано</span>
                </div>
              )}
              
              {level.isAvailable && !level.isCompleted && (
                <div className="mt-4">
                  <button 
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLevelSelect(level.id);
                    }}
                  >
                    Начать уровень
                  </button>
                </div>
              )}
              
              {level.isCompleted && (
                <div className="mt-4">
                  <button 
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLevelSelect(level.id);
                    }}
                  >
                    Играть снова
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelMap;