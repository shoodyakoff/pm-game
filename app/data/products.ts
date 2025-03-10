import { Product } from "@/types/game";

export const products: Product[] = [
  {
    id: 'foodshare',
    title: "FoodShare",
    name: "FoodShare",
    description: "Приложение для обмена домашней едой между соседями",
    image: "/images/apps/foodshare-app.png",
    features: [
      "Публикация излишков приготовленной еды",
      "Система рейтинга поваров",
      "Чат для общения с соседями",
      "Календарь домашних обедов",
      "Простые платежи между пользователями"
    ]
  },
  {
    id: 'petcare',
    title: "PetCare",
    name: "PetCare",
    description: "Приложение для заботы о домашних животных",
    image: "/images/apps/petcare-app.png",
    features: [
      "Дневник питания и здоровья питомца",
      "Поиск ветеринаров поблизости",
      "Напоминания о прививках и процедурах",
      "Советы по уходу",
      "Сообщество владельцев питомцев"
    ]
  },
  {
    id: 'sportbuddy',
    title: "SportBuddy",
    name: "SportBuddy",
    description: "Приложение для поиска партнеров по спорту",
    image: "/images/apps/sportbuddy-app.png",
    features: [
      "Поиск людей для совместных тренировок",
      "Организация любительских матчей",
      "Бронирование спортплощадок",
      "Трекер достижений",
      "Система челленджей"
    ]
  }
];

// Экспортируем как PRODUCTS для обратной совместимости
export const PRODUCTS = products;

export default products;