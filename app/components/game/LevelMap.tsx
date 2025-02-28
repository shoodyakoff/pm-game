import { FC } from 'react';
import { motion } from 'framer-motion';
import { GameState } from '../../types/game';

interface Level {
  id: number;
  position: string;
  title: string;
}

interface LevelMapProps {
  levels: Level[];
  unlockedLevels: number[];
  characterLevel: number;
  nickname: string;
  characterType: string;
  characterIcon: string;
  setCurrentLevel: (levelId: number) => void;
  setStep: (step: GameState['step']) => void;
  onReset: () => void;
}

export const LevelMap: FC<LevelMapProps> = ({
  levels,
  unlockedLevels,
  characterLevel,
  nickname,
  characterType,
  characterIcon,
  setCurrentLevel,
  setStep,
  onReset
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="relative w-full h-screen flex items-center pt-[120px]">
        {levels.map((level) => (
          <motion.button
            key={level.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: level.id * 0.2 }}
            className={`absolute ${level.position} px-6 py-3 font-bold text-white rounded-lg transition-all duration-300
              ${unlockedLevels.includes(level.id)
                ? (level.id < Math.max(...unlockedLevels)
                  ? 'bg-gradient-to-br from-green-500/30 to-green-600/30 border-2 border-green-400 shadow-lg shadow-green-500/20'
                  : 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-2 border-blue-400 shadow-lg shadow-blue-500/20')
                : 'bg-gray-800/50 border-2 border-gray-700 opacity-50 cursor-not-allowed'
              }
              hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20
              active:scale-95`}
            disabled={!unlockedLevels.includes(level.id)}
            onClick={() => {
              if (unlockedLevels.includes(level.id)) {
                setCurrentLevel(level.id);
                setStep('character');
              }
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className={`text-sm ${
                unlockedLevels.includes(level.id)
                  ? 'text-blue-400'
                  : 'text-gray-500'
              }`}>
                {level.id === Math.max(...unlockedLevels) ? 'Текущий' : 
                 unlockedLevels.includes(level.id) ? 'Пройден' : 'Заблокирован'}
              </span>
              <span className="text-xl">{level.title}</span>
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="absolute top-4 right-4 flex gap-4 h-[100px]">
        <motion.div 
          className="bg-gray-800/90 p-4 rounded-lg backdrop-blur-sm flex gap-4 border border-blue-500/20 shadow-lg shadow-blue-500/10 h-full"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
        >
          <img 
            src={characterIcon}
            alt={nickname}
            className="h-full aspect-square object-cover rounded-lg"
          />
          <div className="flex flex-col justify-center">
            <p className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Уровень: {characterLevel}
            </p>
            <p className="text-gray-300">{nickname}</p>
            <p className="text-sm text-blue-400">{characterType}</p>
          </div>
        </motion.div>

        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-full px-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-sm"
        >
          Сбросить прогресс
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LevelMap; 