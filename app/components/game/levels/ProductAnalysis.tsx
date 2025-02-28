import { motion } from "framer-motion";
import { useState } from "react";
import { Product, Character } from "../../../types/game";

interface AnalysisData {
  audience: string;
  competitors: string;
}

interface ProductAnalysisProps {
  selectedProduct: Product;
  selectedCharacter: Character;
  onComplete: () => void;
  onBack: () => void;
  analysisData: AnalysisData;
  onAnalysisChange: (data: AnalysisData) => void;
}

export default function ProductAnalysis({ 
  selectedProduct, 
  selectedCharacter, 
  onComplete, 
  onBack,
  analysisData,
  onAnalysisChange
}: ProductAnalysisProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleCheck = () => {
    setShowAnalysis(true);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <motion.button
            onClick={onBack}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад
          </motion.button>
        </div>

        <div className="bg-gray-800 rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-8 text-white">Анализ продукта: {selectedProduct.title}</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">Целевая аудитория</h2>
              <textarea
                value={analysisData.audience}
                onChange={(e) => onAnalysisChange({
                  ...analysisData,
                  audience: e.target.value
                })}
                className="w-full h-32 bg-gray-700 text-white rounded-lg p-4"
                placeholder="Опишите целевую аудиторию продукта..."
              />
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 text-white">Конкуренты</h2>
              <textarea
                value={analysisData.competitors}
                onChange={(e) => onAnalysisChange({
                  ...analysisData,
                  competitors: e.target.value
                })}
                className="w-full h-32 bg-gray-700 text-white rounded-lg p-4"
                placeholder="Опишите основных конкурентов продукта..."
              />
            </div>

            {!showAnalysis && (
              <motion.button
                onClick={handleCheck}
                className="px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Проверить анализ
              </motion.button>
            )}

            {showAnalysis && (
              <div className="mt-8 bg-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Рекомендации AI:</h3>
                <div className="text-gray-300 space-y-4">
                  <p>Ваш анализ целевой аудитории очень точный. Рекомендую также обратить внимание на следующие сегменты:</p>
                  <ul className="list-disc list-inside">
                    <li>Молодые профессионалы 25-35 лет</li>
                    <li>Студенты технических вузов</li>
                    <li>Начинающие предприниматели</li>
                  </ul>
                  <p>По конкурентам: хороший обзор рынка. Дополнительные рекомендации:</p>
                  <ul className="list-disc list-inside">
                    <li>Сфокусируйтесь на уникальных преимуществах продукта</li>
                    <li>Рассмотрите возможности коллаборации с косвенными конкурентами</li>
                    <li>Изучите стратегии выхода на новые рынки</li>
                  </ul>
                </div>

                <motion.button
                  onClick={onComplete}
                  className="mt-8 px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Продолжить
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}