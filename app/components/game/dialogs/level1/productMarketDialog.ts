import { DialogData } from "../../../../types/dialog";

export const productMarketDialogue: DialogData = {
  speakers: [
    {
      id: "ceo",
      icon: "/characters/ceo_icon.png",
      position: "left"
    },
    {
      id: "pm",
      icon: (characterImage: string) => characterImage,
      position: "right"
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