import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/types/character';
import { Product } from '@/types/game';
import { products } from '@/data/products';

interface ProductSelectionProps {
  character: Character & { customName: string };
  onBack: () => void;
  onSelect: (product: Product) => void;
}

const ProductSelection: FC<ProductSelectionProps> = ({ character, onBack, onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col p-4">
      <div className="max-w-4xl mx-auto w-full bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            className="text-blue-400 hover:text-blue-300 flex items-center"
            onClick={onBack}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </button>
          
          <h1 className="text-2xl font-bold text-white">Выбор продукта</h1>
          
          <div className="w-20"></div> {/* Пустой div для выравнивания */}
        </div>
        
        <p className="text-gray-300 mb-6">
          {character.customName}, выберите продукт, который вы хотите проанализировать и развивать:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
              onClick={() => onSelect(product)}
            >
              <div className="flex items-center">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <h2 className="text-xl font-bold text-blue-400">{product.title}</h2>
                  <p className="text-gray-300">{product.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;