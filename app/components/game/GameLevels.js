import { motion } from "framer-motion";

export default function GameLevels({
  currentLevel,
  answer,
  setAnswer,
  error,
  taskCompleted,
  handleLevelComplete,
  playSound
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8 max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Уровень {currentLevel}
      </h1>

      <div className="bg-gray-800/50 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Задача</h2>
        <p className="text-gray-300 mb-6">
          Сколько будет 2 + 2 в мире продакт-менеджера?
        </p>

        <div className="space-y-4">
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full px-6 py-3 bg-gray-700/50 rounded-lg border border-gray-600 
              text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="Введите ваш ответ"
          />
          
          {error && (
            <p className="text-red-400">{error}</p>
          )}

          {taskCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/20 text-green-400 p-4 rounded-lg"
            >
              Отлично! Уровень пройден!
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-bold 
            hover:from-blue-600 hover:to-purple-600"
          onClick={handleLevelComplete}
          onMouseEnter={() => playSound('hover')}
        >
          Проверить ответ
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gray-700 rounded-lg font-bold hover:bg-gray-600"
          onClick={() => setStep(2)}
          onMouseEnter={() => playSound('hover')}
        >
          Вернуться к карте
        </motion.button>
      </div>
    </motion.div>
  );
}