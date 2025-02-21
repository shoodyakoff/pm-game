import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function DialogScene({ 
  dialogue, 
  selectedCharacter, 
  onComplete 
}) {
  const [currentSpeaker, setCurrentSpeaker] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  
  // ... код из предыдущего DialogScene ...
}