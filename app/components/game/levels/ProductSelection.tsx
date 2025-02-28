import { motion } from "framer-motion"; // Удалим неиспользуемый HTMLMotionProps
import { useState } from "react";
import { products } from "../../../data/products"; // Next.js автоматически разрешит .ts расширение
import { Product, Character } from "../../../types/game";
import { DialogData } from "../../../types/dialog";
import DialogScene from "../dialogs/DialogScene";

interface ProductSelectionProps {
  onSelect: (product: Product) => void;
  selectedCharacter: Character;
}

const mobileMarketDialogue: DialogData = {
  speakers: [
    { 
      id: "ceo", 
      icon: "/characters/ceo_icon.png",
      position: "left"  // добавляем позицию для CEO
    },
    { 
      id: "pm", 
      icon: (characterImage: string) => characterImage,
      position: "right"  // добавляем позицию для PM
    }
  ],
  messages: [
    {
      speaker: "ceo",
      text: [
        "Наша компания фокусируется на рынке мобильных приложений.",
        "Мы видим огромный потенциал в этом направлении, так как количество пользователей мобильных устройств растет с каждым днем.",
        "Давай рассмотрим каждую идею подробнее."
      ]
    }
  ]
};

export default function ProductSelection({ onSelect, selectedCharacter }: ProductSelectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <DialogScene
            dialogue={mobileMarketDialogue}
            selectedCharacter={selectedCharacter}
            onComplete={() => {}}
            showControls={false}
          />
        </div>

        <div>
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
                onClick={() => setSelectedProduct(product)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-4 relative h-[300px]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
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
            Выбрать продукт
          </motion.button>
        </div>
      </div>
    </div>
  );
}