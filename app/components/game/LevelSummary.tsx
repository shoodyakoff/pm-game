import { motion } from "framer-motion";
import { LevelSummaryProps } from "../../types/game";
import Image from "next/image";

export default function LevelSummary({
  character,
  levelNumber,
  levelTitle,
  skills,
  results,
  reward,
  onComplete
}: LevelSummaryProps) {
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
                alt={character.name}
                fill
                style={{ objectFit: 'contain' }}
                priority
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-white">{character.name}</h2>
              <p className="text-lg text-gray-300">Уровень {levelNumber}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-3/5 space-y-8">
            {/* Skills */}
            <div className="bg-gray-100 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{levelTitle}</h2>
              <div className="grid grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                    <Image src={skill.icon} alt={skill.name} width={52} height={52} className="mb-3" />
                    <h3 className="font-bold text-gray-800 mb-1">{skill.name}</h3>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

            {/* Results */}
            <div className="bg-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Основные итоги</h2>
              {results}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

            {/* Reward */}
            {reward && (
              <div className="bg-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Награда за уровень</h2>
                <motion.div 
                  className="bg-gray-700 rounded-lg p-4 flex items-start gap-4"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 1],
                    opacity: [0, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    times: [0, 0.7, 1],
                    ease: "easeOut"
                  }}
                >
                  <div className="relative w-16 h-16">
                    <motion.div
                      className="absolute inset-0 bg-yellow-400 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.8, 0],
                        scale: [1, 1.5, 1.8]
                      }}
                      transition={{
                        duration: 0.8,
                        times: [0, 0.2, 1],
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                    <Image 
                      src={reward.imagePath} 
                      alt={reward.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="relative z-10"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{reward.name}</h3>
                    <p className="text-gray-300">{reward.description}</p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Complete Button */}
            <div className="flex justify-end">
              <motion.button
                onClick={onComplete}
                className="px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Завершить уровень
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}