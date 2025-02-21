import { DialogData } from "../../../../types/dialog";

export const productIntroDialogue: DialogData = {
  speakers: [
    {
      id: "ceo",
      icon: "/assets/characters/ceo_icon.png",
      position: "left"
    },
    {
      id: "pm",
      icon: (characterImage: string) => characterImage.replace('.png', '_icon.png'),
      position: "right"
    }
  ],
  messages: [
    {
      speaker: "ceo",
      text: [
        "Привет! Рад видеть тебя в нашей команде в роли Product Manager!",
        "У нас сейчас отличная ситуация - есть инвестиции и несколько перспективных идей для развития.",
        "Твоя первая задача - выбрать направление, в котором мы будем развиваться. Оцени каждую идею и подготовь обоснование."
      ]
    },
    {
      speaker: "pm",
      text: [
        "Здравствуйте! Спасибо за доверие.",
        "Я изучу все предложенные идеи и проанализирую их потенциал.",
        "Подготовлю детальный анализ каждого направления."
      ]
    }
  ]
};