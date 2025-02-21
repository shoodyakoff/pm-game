import { motion } from "framer-motion";
import { Product } from "../../../types/game";

export default function ProductAnalysis({ 
  product, 
  onComplete 
}: { 
  product: Product;
  onComplete: (score: number) => void;
}) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Анализ продукта: {product.title}</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-800/30 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Целевая аудитория</h2>
          {/* Добавить интерактивный анализ */}
        </div>

        <div className="bg-gray-800/30 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Ценностное предложение</h2>
          {/* Добавить интерактивный анализ */}
        </div>

        <div className="bg-gray-800/30 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Риски</h2>
          {/* Добавить интерактивный анализ */}
        </div>
      </div>

      <motion.button
        className="mt-8 px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold"
        onClick={() => onComplete(100)} // Временно всегда 100 очков
      >
        Завершить анализ
      </motion.button>
    </div>
  );
}