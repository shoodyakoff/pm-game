import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types/game';

interface Level1Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

const Level1: FC<Level1Props> = ({ products, onSelect }) => {
  // Состояние для отслеживания текущего шага диалога
  const [dialogStep, setDialogStep] = useState(0);
  
  // Функция для перехода к следующему шагу диалога
  const handleNextDialog = () => {
    setDialogStep(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-8">
        {/* Диалог CEO */}
        <div className="flex items-start gap-4 mb-8">
          <img src="/characters/ceo_icon.png" alt="CEO" className="w-12 h-12 rounded-full" />
          <div className="bg-gray-800 rounded-lg p-4 max-w-3xl">
            <h3 className="font-bold mb-2">CEO</h3>
            <p>Давай рассмотрим каждую идею подробнее.</p>
          </div>
        </div>
        
        {dialogStep >= 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-6">Выберите продукт для развития</h2>
          </motion.div>
        )}
        
        {dialogStep >= 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {products.map(product => (
              <div 
                key={product.id}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
                onClick={() => onSelect(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-gray-300">{product.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
        
        {dialogStep < 2 && (
          <div className="flex justify-end mt-4">
            <button 
              onClick={handleNextDialog}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Продолжить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level1; 