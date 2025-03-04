import { Character } from '../../types/character';

export const mockCharacters: Character[] = [
  {
    id: 'product-lead',
    type: 'product-lead',
    displayName: 'Product Lead',
    roleTitle: 'Product Lead',
    description: 'Отвечает за продукт и его развитие. Определяет приоритеты задач и формирует видение продукта.',
    image: '/characters/product-lead-full.png',
    icon: '/characters/product-lead-icon.png',
    difficulty: 'Нормально',
    stats: {
      impact: 80,
      leadership: 70,
      technical: 60
    },
    hairImage: '/characters/product-lead-hair.png'
  },
  {
    id: 'ux-visionary',
    type: 'ux-visionary',
    displayName: 'UX-визионер',
    roleTitle: 'UX-визионер',
    description: 'Создает пользовательский опыт, который делает продукт удобным и привлекательным для пользователей.',
    image: '/characters/ux-visionary-full.png',
    icon: '/characters/ux-visionary-icon.png',
    difficulty: 'Сложно',
    stats: {
      impact: 70,
      leadership: 60,
      technical: 80
    }
  },
  {
    id: 'tech-pm',
    type: 'tech-pm',
    displayName: 'Технический PM',
    roleTitle: 'Технический PM',
    description: 'Управляет техническими аспектами продукта, обеспечивая его стабильность и масштабируемость.',
    image: '/characters/tech-pm-full.png',
    icon: '/characters/tech-pm-icon.png',
    difficulty: 'Легко',
    stats: {
      impact: 60,
      leadership: 80,
      technical: 90
    }
  },
  {
    id: 'growth-hacker',
    type: 'growth-hacker',
    displayName: 'Growth Hacker',
    roleTitle: 'Growth Hacker',
    description: 'Специалист по быстрому росту продукта. Использует нестандартные подходы для привлечения пользователей.',
    image: '/characters/growth-hacker-full.png',
    icon: '/characters/growth-hacker-icon.png',
    difficulty: 'Сложно',
    stats: {
      impact: 85,
      leadership: 65,
      technical: 70
    }
  },
  {
    id: 'agile-coach',
    type: 'agile-coach',
    displayName: 'Agile Coach',
    roleTitle: 'Agile Coach',
    description: 'Помогает команде эффективно работать по гибким методологиям. Фасилитирует процессы и устраняет препятствия.',
    image: '/characters/agile-coach-full.png',
    icon: '/characters/agile-coach-icon.png',
    difficulty: 'Нормально',
    stats: {
      impact: 75,
      leadership: 90,
      technical: 55
    }
  }
]; 