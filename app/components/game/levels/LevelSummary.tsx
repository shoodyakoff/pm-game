import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Character } from '@/types/character';
import { LevelSummaryProps, Skill, LevelReward } from '@/types/game';

export const LevelSummary: React.FC<LevelSummaryProps> = ({
  character,
  levelName,
  levelTitle,
  skills,
  results,
  reward,
  onComplete
}) => {
  const characterImagePath = `/characters/${character.id}-full.png`;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex gap-8">
          {/* Left Section */}
          <div className="w-2/5 bg-[#1a1f3c] rounded-xl p-8">
            <div className="h-[500px] relative flex items-center justify-center">
              <Image 
                src={characterImagePath}
                alt={character.customName || character.displayName}
                fill
                style={{ objectFit: 'contain' }}
                priority
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-white">{character.customName || character.displayName}</h2>
              <p className="text-lg text-gray-300">{levelName}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-3/5 space-y-6">
            <div className="bg-[#1a1f3c] rounded-xl p-8">
              <h1 className="text-3xl font-bold text-white mb-4">{levelTitle}</h1>
              
              {/* Skills */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Полученные навыки</h2>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill: Skill, index: number) => (
                    <div key={index} className="bg-[#2a2f4c] p-4 rounded-lg flex items-start gap-3">
                      <div className="w-10 h-10 flex-shrink-0 bg-blue-600 rounded-full flex items-center justify-center">
                        <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{skill.name}</h3>
                        <p className="text-sm text-gray-300">{skill.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Results */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Результаты</h2>
                <div className="bg-[#2a2f4c] p-4 rounded-lg">
                  {results}
                </div>
              </div>
              
              {/* Reward */}
              {reward && reward.item && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">Награда</h2>
                  <div className="bg-[#2a2f4c] p-4 rounded-lg flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#3a3f5c] rounded-lg flex items-center justify-center">
                      <img 
                        src={`/items/${reward.item.type}/${reward.item.id}.png`} 
                        alt={reward.item.name} 
                        className="w-12 h-12 object-contain" 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{reward.item.name}</h3>
                      <p className="text-sm text-gray-300">Новый предмет добавлен в ваш инвентарь!</p>
                    </div>
                  </div>
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                onClick={onComplete}
              >
                Продолжить
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSummary; 