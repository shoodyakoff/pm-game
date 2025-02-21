import { motion } from "framer-motion"; // Удалим неиспользуемый HTMLMotionProps
import { useState } from "react";
import { products } from "../../../data/products";
import { Product } from "../../../types/game";

interface ProductSelectionProps {
  onSelect: (product: Product) => void;
}

export default function ProductSelection({ onSelect }: ProductSelectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  // Убираем try-catch, так как тут нет асинхронных операций
  // и потенциальных ошибок

  if (!Array.isArray(products) || products.length === 0) { // Улучшаем проверку
    return (
      <div className="p-8 text-center text-red-500">
        Ошибка загрузки данных о продуктах
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Выберите продукт для развития
      </h1>
      
      <div className="grid grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className={`p-6 rounded-xl cursor-pointer transition-all
              ${selectedProduct?.id === product.id 
                ? 'bg-teal-600/20 ring-2 ring-teal-500' 
                : 'bg-gray-800/30 hover:bg-gray-700/30'}`}
            onClick={() => handleProductSelect(product)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h2 className="text-xl font-bold mb-3 text-white">
              {product.title}
            </h2>
            <p className="text-gray-300 mb-4">
              {product.description}
            </p>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-400">
                  • {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="mt-8 px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold 
          disabled:opacity-50 disabled:cursor-not-allowed mx-auto block text-white"
        onClick={() => selectedProduct && onSelect(selectedProduct)}
        disabled={!selectedProduct}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {selectedProduct ? 'Продолжить' : 'Выберите продукт'}
      </motion.button>

      {error && (
        <p className="mt-4 text-center text-red-500">{error}</p>
      )}
    </div>
  );
}