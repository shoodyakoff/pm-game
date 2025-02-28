import { FC } from 'react'
import styles from './CharacterSelect.module.css'

export interface PMCharacter {
  id: string;
  type: 'Product Owner' | 'Growth PM' | 'Technical PM' | 'Analytics PM' | 'UX-focused PM';
  name: string;
  stats: {
    technical: number;
    soft: number;
    leadership: number;
    analytics: number;
  };
}

interface CharacterSelectProps {
  onSelect: (character: PMCharacter) => void;
  selectedCharacter?: PMCharacter;
}

export const CharacterSelect: FC<CharacterSelectProps> = ({
  onSelect,
  selectedCharacter
}) => {
  return (
    <div className={styles.container}>
      {/* Character selection UI */}
    </div>
  )
} 