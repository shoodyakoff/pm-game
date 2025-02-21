export interface DialogMessage {
  speaker: string;
  text: string[];
}

export interface DialogData {
  speakers: {
    id: string;
    icon: string | ((characterImage: string) => string);
    position: 'left' | 'right';
  }[];
  messages: DialogMessage[];
}