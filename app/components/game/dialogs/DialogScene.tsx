import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '@/types/character';
import { DialogData } from '@/types/game';

interface DialogSceneProps {
  dialog: DialogData;
  onComplete: () => void;
  showControls?: boolean;
}

const DialogScene: React.FC<DialogSceneProps> = ({
  dialog,
  onComplete,
  showControls = true
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [displayedTexts, setDisplayedTexts] = useState<string[]>(Array(dialog.steps.length).fill(''));
  const [isTypingComplete, setIsTypingComplete] = useState<boolean[]>(Array(dialog.steps.length).fill(false));
  
  // Эффект для анимации печатания текста для текущего шага
  useEffect(() => {
    if (currentStepIndex >= dialog.steps.length) return;
    
    const text = dialog.steps[currentStepIndex].text;
    let index = 0;
    setDisplayedTexts(prev => {
      const newTexts = [...prev];
      newTexts[currentStepIndex] = '';
      return newTexts;
    });
    
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedTexts(prev => {
          const newTexts = [...prev];
          newTexts[currentStepIndex] = text.substring(0, index + 1);
          return newTexts;
        });
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(prev => {
          const newComplete = [...prev];
          newComplete[currentStepIndex] = true;
          return newComplete;
        });
        
        // Если это первый шаг (CEO), автоматически переходим ко второму шагу (PM) после небольшой паузы
        if (currentStepIndex === 0) {
          setTimeout(() => {
            setCurrentStepIndex(1);
          }, 1000); // Пауза 1 секунда между репликами
        }
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, [currentStepIndex, dialog.steps]);
  
  // Проверяем, завершен ли весь диалог
  const isAllTypingComplete = isTypingComplete[dialog.steps.length - 1];
  
  // Обработчик для завершения диалога
  const handleComplete = () => {
    onComplete();
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="space-y-6">
          {dialog.steps.map((step, index) => {
            // Показываем только текущий и предыдущие шаги
            if (index > currentStepIndex) return null;
            
            const isSpeakerCharacter = step.speaker === 'PM';
            
            // Определяем аватар для текущего шага
            let avatarSrc = step.avatar || '';
            
            // Определяем имя говорящего
            const speakerName = step.speaker;
            
            return (
              <div 
                key={index} 
                className={`flex items-start ${isSpeakerCharacter ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Аватар говорящего */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 mx-4 flex-shrink-0">
                  {avatarSrc && (
                    <img 
                      src={avatarSrc} 
                      alt={speakerName} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                <div className={`flex-1 ${isSpeakerCharacter ? 'text-right' : 'text-left'}`}>
                  {/* Имя говорящего */}
                  <h3 className={`text-xl font-bold ${isSpeakerCharacter ? 'text-green-400' : 'text-blue-400'} mb-2`}>
                    {speakerName}
                  </h3>
                  
                  {/* Текст диалога */}
                  <div className={`bg-gray-700 rounded-lg p-4 min-h-[60px] inline-block max-w-[80%] ${isSpeakerCharacter ? 'bg-green-900/30' : 'bg-blue-900/30'}`}>
                    <p className="text-white">{displayedTexts[index]}</p>
                    {index === currentStepIndex && !isTypingComplete[index] && (
                      <span className="inline-block w-2 h-4 bg-white ml-1 animate-blink"></span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Кнопка для завершения диалога */}
        {showControls && isAllTypingComplete && (
          <div className="flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              onClick={handleComplete}
            >
              Продолжить
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogScene;