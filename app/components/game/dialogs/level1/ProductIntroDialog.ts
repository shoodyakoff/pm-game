import { DialogData } from '@/types/game';

// Диалог для введения в выбор продукта
const ProductIntroDialog: DialogData = {
  steps: [
    {
      speaker: 'CEO',
      text: 'Добро пожаловать в нашу компанию! Нам нужен опытный Product Manager, который поможет выбрать правильный продукт для разработки.',
      avatar: '/characters/ceo_icon.png'
    },
    {
      speaker: 'PM',
      text: 'Спасибо за доверие! Я готов проанализировать рынок и подготовить рекомендации.',
      avatar: 'character_icon'
    }
  ]
};

export default ProductIntroDialog;