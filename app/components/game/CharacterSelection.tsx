'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Character } from '../../types/game';
import { characters } from '../../data/characters';

interface CharacterSelectionProps {
  onSelect: (character: Character & { customName: string }) => void;
}

const CharacterSelection: FC<CharacterSelectionProps> = ({ onSelect }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [customName, setCustomName] = useState('');

  const handleSubmit = () => {
    if (selectedCharacter && customName.trim()) {
      onSelect({
        ...selectedCharacter,
        customName: customName.trim()
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Выберите своего Product Manager
      </h1>
      
      <div className="grid grid-cols-5 gap-6 mb-8">
        {characters.map((char) => (
          <motion.button
            key={char.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative p-6 rounded-xl transition-all duration-300
              ${selectedCharacter?.id === char.id 
                ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-2 border-blue-400' 
                : 'bg-gray-800/50 hover:bg-gray-800/80'}`}
            onClick={() => setSelectedCharacter(char)}
          >
            <img 
              src={char.icon}
              alt={char.name} 
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{char.name}</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">{char.type}</p>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  char.difficulty === "Легко" ? "bg-green-500/20 text-green-400" :
                  char.difficulty === "Нормально" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {char.difficulty}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {selectedCharacter && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-xl p-6 max-w-2xl mx-auto backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold mb-4">{selectedCharacter.name}</h2>
          <p className="text-gray-300 mb-4">{selectedCharacter.description}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            {Object.entries(selectedCharacter.stats).map(([stat, value]) => (
              <div key={stat} className="space-y-2">
                <p className="text-sm text-gray-400 capitalize">{stat}</p>
                <motion.div 
                  className="h-2 bg-gray-700 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ delay: 0.2 }}
                  />
                </motion.div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Оружие</p>
              <p className="text-gray-300">{selectedCharacter.weapon}</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <input
          type="text"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Введите имя персонажа"
          className="w-64 px-6 py-3 bg-gray-800/50 rounded-lg border border-gray-700 
            text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        
        <button
          onClick={handleSubmit}
          disabled={!selectedCharacter || !customName.trim()}
          className={`px-8 py-3 rounded-lg font-bold transition-colors ${
            selectedCharacter && customName.trim()
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              : 'bg-gray-700 cursor-not-allowed'
          }`}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default CharacterSelection;