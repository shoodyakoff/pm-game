import { Character } from '../types/game';

export const characters: Character[] = [
  {
    id: '1',
    name: "Product Lead",
    image: "/characters/product-lead-full.png",
    icon: "/characters/product-lead-icon.png",
    description: "Стратег и визионер. Превращает хаос в структурированный план действий.",
    type: "Стратег",
    difficulty: "Нормально",
    weapon: "OKR Dashboard, Roadmap Canvas",
    stats: {
      impact: 90,
      leadership: 85,
      technical: 65
    }
  },
  {
    id: '2',
    name: "Agile Coach",
    image: "/characters/agile-coach-full.png",
    icon: "/characters/agile-coach-icon.png",
    description: "Мастер Scrum и Kanban. Помогает командам достигать максимальной эффективности.",
    type: "Поддержка",
    difficulty: "Сложно",
    weapon: "Scrum Guide, Agile Manifesto",
    stats: {
      impact: 75,
      leadership: 90,
      technical: 60
    }
  },
  {
    id: '3',
    name: "Growth Hacker",
    image: "/characters/growth-hacker-full.png",
    icon: "/characters/growth-hacker-icon.png",
    description: "Экспериментатор и аналитик. Находит нестандартные пути к росту продукта.",
    type: "DPS",
    difficulty: "Экстрим",
    weapon: "A/B Testing Lab, Analytics Suite",
    stats: {
      impact: 95,
      leadership: 65,
      technical: 80
    }
  },
  {
    id: '4',
    name: "UX Visionary",
    image: "/characters/ux-visionary-full.png",
    icon: "/characters/ux-visionary-icon.png",
    description: "Создает магию в интерфейсах. Превращает сложное в простое и элегантное.",
    type: "Дизайнер",
    difficulty: "Легко",
    weapon: "Design System, Prototype Builder",
    stats: {
      impact: 85,
      leadership: 70,
      technical: 75
    }
  },
  {
    id: '5',
    name: "Tech PM",
    image: "/characters/tech-pm-full.png",
    icon: "/characters/tech-pm-icon.png",
    description: "Мост между бизнесом и разработкой. Говорит на языках обоих миров.",
    type: "Гибрид",
    difficulty: "Сложно",
    weapon: "Architecture Diagram, API Specs",
    stats: {
      impact: 80,
      leadership: 75,
      technical: 95
    }
  }
];