'use client';

import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/types/character';

interface CharacterCustomizationProps {
  character: Character;
  onBack: () => void;
  onComplete: (customName: string) => void;
}

const CharacterCustomization: FC<CharacterCustomizationProps> = ({ 
  character, 
  onBack,
  onComplete
}) => {
  const [customName, setCustomName] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = () => {
    if (!customName.trim()) {
      setError('Пожалуйста, введите имя персонажа');
      return;
    }
    
    if (customName.length < 3) {
      setError('Имя должно содержать не менее 3 символов');
      return;
    }
    
    if (customName.length > 20) {
      setError('Имя должно содержать не более 20 символов');
      return;
    }
    
    onComplete(customName);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl p-6 shadow-lg">
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
          
          <h1 className="text-2xl font-bold text-white">Персонализация</h1>
          
          <div className="w-20"></div> {/* Пустой div для выравнивания */}
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <img 
            src={character.icon} 
            alt={character.displayName} 
            className="w-24 h-24 object-contain mb-4"
          />
          <h2 className="text-xl font-bold text-white">{character.displayName}</h2>
          <p className="text-gray-400">{character.roleTitle}</p>
        </div>
        
        <div className="mb-6">
          <label className="block text-white font-bold mb-2" htmlFor="customName">
            Введите имя персонажа:
          </label>
          <input
            id="customName"
            type="text"
            className={`w-full bg-gray-700 text-white rounded-lg p-3 ${error ? 'border-2 border-red-500' : 'border border-gray-600'}`}
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Введите имя..."
          />
          {error && (
            <p className="text-red-500 mt-1">{error}</p>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          onClick={handleSubmit}
        >
          Продолжить
        </motion.button>
      </div>
    </div>
  );
};

export default CharacterCustomization;