import { Character } from '../../types/game';

export const mockCharacters: Character[] = [{
  id: '1',
  name: 'Product Lead',
  type: 'Стратег',
  icon: '/characters/product-lead-icon.png',
  image: '/characters/product-lead.png',
  description: 'Стратег и визионер',
  difficulty: 'Нормально',
  weapon: 'OKR Dashboard',
  stats: {
    impact: 80,
    leadership: 70,
    technical: 60
  }
}, {
  id: '2',
  name: 'Agile Coach',
  type: 'Поддержка',
  icon: '/characters/agile-coach-icon.png',
  image: '/characters/agile-coach.png',
  description: 'Мастер процессов и команд',
  difficulty: 'Сложно',
  weapon: 'Scrum Board',
  stats: {
    impact: 70,
    leadership: 85,
    technical: 50
  }
}, {
  id: '3',
  name: 'CEO',
  type: 'Лидер',
  icon: '/characters/ceo-icon.png',
  image: '/characters/ceo.png',
  description: 'Лидер и визионер',
  difficulty: 'Легко',
  weapon: 'Vision Board',
  stats: {
    impact: 90,
    leadership: 90,
    technical: 40
  }
}]; 