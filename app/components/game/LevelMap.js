import { motion } from "framer-motion";

export default function LevelMap({
  levels,
  unlockedLevels,
  characterLevel,
  setCurrentLevel,
  setStep,
  playSound
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* SVG Background */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="grid-gradient" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-gradient)" />
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Декоративные элементы */}
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r="1"
            fill="#3B82F6"
            opacity="0.2"
          />
        ))}
        
        {/* Соединительные линии между уровнями */}
        {levels.map((level, index) => {
          if (index < levels.length - 1) {
            return (
              <path
                key={`path-${level.id}`}
                d={`M ${10 + index * 20} 25 Q ${20 + index * 20} ${25 + (index % 2 ? 5 : -5)} ${30 + index * 20} 25`}
                stroke={unlockedLevels.includes(level.id + 1) ? "#3B82F6" : "#334155"}
                strokeWidth="2"
                strokeDasharray="4"
                fill="none"
                className="transition-colors duration-300"
              />
            );
          }
          return null;
        })}
      </svg>

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
            }`}
          disabled={!unlockedLevels.includes(level.id)}
          onClick={() => {
            if (unlockedLevels.includes(level.id)) {
              playSound('select');
              setCurrentLevel(level.id);
              setStep(3);
            }
          }}
          onMouseEnter={() => playSound('hover')}
        >
          {level.title}
        </motion.button>
      ))}

      <div className="absolute bottom-8 left-8 bg-gray-800/50 px-6 py-4 rounded-lg">
        <p className="text-white font-bold">Уровень персонажа: {characterLevel}</p>
      </div>
    </motion.div>
  );
}