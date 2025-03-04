'use client';

import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/types/character';
import { characters } from '@/data/characters';

interface CharacterSelectionProps {
  onCharacterSelect: (character: Character) => void;
}

const CharacterSelection: FC<CharacterSelectionProps> = ({ onCharacterSelect }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleSelectButtonClick = () => {
    if (selectedCharacter) {
      onCharacterSelect(selectedCharacter);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-2">
      <h1 className="text-3xl font-bold text-white mb-8">Выберите персонажа</h1>
      
      <div className="grid grid-cols-5 gap-4 max-w-6xl mb-8">
        {characters.map((character) => (
          <motion.div
            key={character.id}
            className={`bg-gray-800 rounded-xl p-4 shadow-lg flex flex-col items-center cursor-pointer transition-colors flex-shrink-0 w-64
              ${selectedCharacter?.id === character.id ? 'ring-2 ring-blue-500 bg-gray-700' : 'hover:bg-gray-700'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCharacterClick(character)}
          >
            <img 
              src={character.image} 
              alt={character.displayName} 
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-xl font-bold text-white">{character.displayName}</h2>
            <p className="text-gray-400 text-center">{character.roleTitle}</p>
          </motion.div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="bg-gray-800 rounded-xl p-6 max-w-3xl w-full mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img 
                src={selectedCharacter.image} 
                alt={selectedCharacter.displayName} 
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedCharacter.displayName}</h2>
              <p className="text-gray-300 mb-4">{selectedCharacter.description}</p>
              
              <div className="mb-4">
                <p className="text-gray-400 mb-1">Сложность: <span className="text-white">{selectedCharacter.difficulty}</span></p>
              </div>
              
              <div className="space-y-2 mb-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Влияние на бизнес</span>
                    <span className="text-white">{selectedCharacter.stats?.impact}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${selectedCharacter.stats?.impact}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Лидерские качества</span>
                    <span className="text-white">{selectedCharacter.stats?.leadership}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${selectedCharacter.stats?.leadership}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Технические навыки</span>
                    <span className="text-white">{selectedCharacter.stats?.technical}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${selectedCharacter.stats?.technical}%` }}></div>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full"
                onClick={handleSelectButtonClick}
              >
                Выбрать
              </motion.button>
            </div>
          </div>
        </div>
      )}
      
      {!selectedCharacter && (
        <p className="text-gray-400 text-center">Выберите персонажа, чтобы увидеть подробную информацию</p>
      )}
    </div>
  );
};

export default CharacterSelection;