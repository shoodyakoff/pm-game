Куку


"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const characters = [
  {
    name: "Product Lead",
    icon: "/characters/product-lead-icon.png", 
    image: "/characters/product-lead-full.png",
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
    name: "Agile Coach",
    icon: "/characters/agile-coach-icon.png",
    image: "/characters/agile-coach-full.png", 
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
    name: "Growth Hacker",
    icon: "/characters/growth-hacker-icon.png",
    image: "/characters/growth-hacker-full.png",
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
    name: "UX Visionary",
    icon: "/characters/ux-visionary-icon.png",
    image: "/characters/ux-visionary-full.png",
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
    name: "Tech PM",
    icon: "/characters/tech-pm-icon.png",
    image: "/characters/tech-pm-full.png",
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

const items = {
  hat: { image: "/items/hat_startup.png", title: "Шапка стартапера" },
  shirt: { image: "/items/shirt_unicorn.png", title: "Кальчуга менеджера" },
  pants: { image: "/items/male.png", title: "Оружие" },
  transport: { image: "/items/scooter_electric.png", title: "Электроягуар" }
};

const levels = [
  { id: 1, position: "top-[20%] left-[10%]", status: "available", title: "Уровень 1" },
  { id: 2, position: "top-[35%] left-[30%]", status: "locked", title: "Уровень 2" },
  { id: 3, position: "top-[20%] left-[50%]", status: "locked", title: "Уровень 3" },
  { id: 4, position: "top-[35%] left-[70%]", status: "locked", title: "Уровень 4" },
  { id: 5, position: "top-[20%] left-[90%]", status: "locked", title: "Уровень 5" }
];

const DraggableItem = ({ item, category, onDrag, sounds }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { ...item, category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <motion.div 
      ref={drag}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-800/50 p-4 rounded-xl cursor-move"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-24 object-contain mb-2"
      />
      <p className="text-center text-white">{item.title}</p>
    </motion.div>
  );
};

export default function GameFlow() {
  const [sounds] = useState(() => ({
    hover: typeof Audio !== 'undefined' ? new Audio('/sounds/hover.mp3') : null,
    select: typeof Audio !== 'undefined' ? new Audio('/sounds/select.mp3') : null,
    close: typeof Audio !== 'undefined' ? new Audio('/sounds/close.mp3') : null,
    equip: typeof Audio !== 'undefined' ? new Audio('/sounds/equip.mp3') : null,
    complete: typeof Audio !== 'undefined' ? new Audio('/sounds/complete.mp3') : null
  }));

  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [equippedItems, setEquippedItems] = useState({
    hat: null,
    shirt: null,
    pants: null,
    transport: null
  });
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [answer, setAnswer] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [error, setError] = useState("");
  const [characterLevel, setCharacterLevel] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const [, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => {
      playSound('equip');
      handleEquip(item.category, item);
    }
  }));

  const handleEquip = (category, item) => {
    setEquippedItems((prev) => ({ ...prev, [category]: item }));
    setSelectedItem(item);
  };

  const playSound = (soundName) => {
    if (sounds && sounds[soundName]) {
      sounds[soundName].play().catch(err => {
        console.log('Sound play error:', err);
      });
    }
  };

  const handleCharacterSelect = (char) => {
    playSound('select');
    setSelectedCharacter(char);
  };

  const handleLevelComplete = () => {
    if (parseInt(answer) === 4) {
      playSound('complete');
      setTaskCompleted(true);
      setError("");
      const nextLevel = currentLevel + 1;
      setUnlockedLevels(prev => [...new Set([...prev, nextLevel])]);
      setCharacterLevel(prev => prev + 1);
      setTimeout(() => {
        setStep(2);
        setAnswer("");
        setTaskCompleted(false);
      }, 1500);
    } else {
      setError("Неправильный ответ, попробуйте еще раз");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen"
          >
            {step === 1 && (
              <motion.div className="p-8">
                <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Выберите своего Product Manager
                </h1>

                <div className="grid grid-cols-5 gap-6 mb-8">
                  {characters.map((char) => (
                    <motion.button
                      key={char.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative p-6 rounded-xl transition-all duration-300
                        ${selectedCharacter?.name === char.name 
                          ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-2 border-blue-400' 
                          : 'bg-gray-800/50 hover:bg-gray-800/80'}`}
                      onClick={() => handleCharacterSelect(char)}
                      onMouseEnter={() => playSound('hover')}
                    >
                      <img 
                        src={char.icon}
                        alt={char.name} 
                        className="w-full h-48 object-contain mb-4"
                      />
                      <h3 className="text-xl font-bold mb-2">{char.name}</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">{char.type}</p>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            char.difficulty === "Легко" ? "bg-green-500/20 text-green-400" :
                            char.difficulty === "Нормально" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-red-500/20 text-red-400"
                          }`}>
                            {char.difficulty}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {selectedCharacter && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 rounded-xl p-6 max-w-2xl mx-auto"
                  >
                    <h2 className="text-2xl font-bold mb-4">{selectedCharacter.name}</h2>
                    <p className="text-gray-300 mb-4">{selectedCharacter.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {Object.entries(selectedCharacter.stats).map(([stat, value]) => (
                        <div key={stat} className="space-y-2">
                          <p className="text-sm text-gray-400 capitalize">{stat}</p>
                          <motion.div 
                            className="h-2 bg-gray-700 rounded-full overflow-hidden"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                          >
                            <motion.div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ delay: 0.2 }}
                            />
                          </motion.div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-400">Оружие</p>
                        <p className="text-gray-300">{selectedCharacter.weapon}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.div 
                  className="mt-8 flex justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <input
                    type="text"
                    placeholder="Введите имя персонажа"
                    className="w-64 px-6 py-3 bg-gray-800/50 rounded-lg border border-gray-700 
                      text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-bold 
                      hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
                    disabled={!nickname || !selectedCharacter}
                    onClick={() => {
                      playSound('select');
                      setStep(2);
                    }}
                  >
                    Продолжить
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

{step === 2 && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative w-full h-screen overflow-hidden"
  >
    {/* SVG Background */}
    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id="grid-gradient" x1="0" y1="0" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-gradient)" />
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Декоративные элементы */}
      {[...Array(20)].map((_, i) => (
        <circle
          key={i}
          cx={`${Math.random() * 100}%`}
          cy={`${Math.random() * 100}%`}
          r="1"
          fill="#3B82F6"
          opacity="0.2"
        />
      ))}
      
      {/* Соединительные линии между уровнями */}
      {levels.map((level, index) => {
        if (index < levels.length - 1) {
          return (
            <path
              key={`path-${level.id}`}
              d={`M ${10 + index * 20} 25 Q ${20 + index * 20} ${25 + (index % 2 ? 5 : -5)} ${30 + index * 20} 25`}
              stroke={unlockedLevels.includes(level.id + 1) ? "#3B82F6" : "#334155"}
              strokeWidth="2"
              strokeDasharray="4"
              fill="none"
              className="transition-colors duration-300"
            />
          );
        }
        return null;
      })}
    </svg>

    {/* Остальной код остается прежним */}
    {levels.map((level) => (
      <motion.button
        key={level.id}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: level.id * 0.2 }}
        className={`absolute ${level.position} px-6 py-3 font-bold text-white rounded-lg transition-all duration-300
          ${unlockedLevels.includes(level.id)
            ? (level.id < Math.max(...unlockedLevels)
              ? 'bg-gradient-to-br from-green-500/30 to-green-600/30 border-2 border-green-400 shadow-lg shadow-green-500/20'
              : 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-2 border-blue-400 shadow-lg shadow-blue-500/20')
            : 'bg-gray-800/50 border-2 border-gray-700 opacity-50 cursor-not-allowed'
          }
          hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20
          active:scale-95`}
        disabled={!unlockedLevels.includes(level.id)}
        onClick={() => {
          playSound('select');
          setCurrentLevel(level.id);
          setStep(3);
        }}
        onMouseEnter={() => playSound('hover')}
      >
        <div className="flex flex-col items-center gap-2">
          <span className={`text-sm ${
            unlockedLevels.includes(level.id)
              ? 'text-blue-400'
              : 'text-gray-500'
          }`}>
            {level.id === Math.max(...unlockedLevels) ? 'Текущий' : 
             unlockedLevels.includes(level.id) ? 'Пройден' : 'Заблокирован'}
          </span>
          <span className="text-xl">{level.title}</span>
        </div>
      </motion.button>
    ))}
    
    <motion.div               
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="absolute top-4 right-4 bg-gray-800/90 p-4 rounded-lg backdrop-blur-sm"
    >
      <p className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Уровень: {characterLevel}
      </p>
      <p className="text-gray-300">{nickname}</p>
    </motion.div>
  </motion.div>
)}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-between p-8 h-screen"
              >
                <div className="w-1/3 bg-gray-800/50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Инвентарь
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(items).map(([category, item]) => (
                      <DraggableItem key={category} item={item} category={category} />
                    ))}
                  </div>
                </div>

                <div ref={drop} className="w-1/3">
                  <div className="relative mt-6 bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm min-h-[600px] h-[80vh] max-h-[800px] flex items-center justify-center">
                    {selectedCharacter && (
                      <motion.img 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src={selectedCharacter.image}
                        alt={selectedCharacter.name}
                        className="object-contain h-[90%] max-h-[700px] w-auto relative z-[12]"
                      />
                    )}
                    {Object.entries(equippedItems).map(([slot, item]) => 
                      item && (
                        <motion.img
                          key={slot}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          src={item.image}
                          alt={item.title}
                          className={`absolute ${
                            slot === 'hat' ? 'left-[35px] bottom-[185px] w-[300px] z-[2222]' :
                            slot === 'shirt' ? 'left-[65px] bottom-[31px] w-[180px] z-[14]' :
                            slot === 'pants' ? 'left-[53px] bottom-[54px] w-[80px] z-[16]' :
                            'left-[15%] bottom-[5%] w-[140px] z-[18]'
                          }`}
                          style={{ 
                            transform: slot === 'pants' 
                              ? 'rotate(-15deg)' 
                              : 'none',
                            objectFit: 'contain'
                          }}
                        />
                      )
                    )}
                  </div>

                  <div className="flex justify-between mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600"
                      onClick={() => {
                        playSound('select');
                        setStep(2);
                      }}
                    >
                      Назад
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg
                        hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
                      onClick={() => {
                        playSound('select');
                        setStep(4);
                      }}
                      disabled={!selectedCharacter || !equippedItems.hat}
                    >
                      Продолжить
                    </motion.button>
                  </div>
                </div>

                <div className="w-1/3 bg-gray-800/50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Описание предмета
                  </h3>
                  {selectedItem && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm"
                    >
                      <img 
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        className="w-32 h-32 object-contain mx-auto mb-4"
                      />
                      <h4 className="text-xl font-bold text-center text-white mb-2">
                        {selectedItem.title}
                      </h4>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-screen p-8"
              >
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Решите задачу
                </h2>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm max-w-md w-full"
                >
                  <p className="text-xl text-center text-white mb-6">
                    Сколько будет 2 * 2?
                  </p>
                  <input 
                    type="number"
                    className="w-full px-6 py-3 bg-gray-700/50 rounded-lg border border-gray-600 
                      text-white placeholder-gray-400 focus:outline-none focus:border-blue-500
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-center mt-4"
                    >
                      {error}
                    </motion.p>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                      text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-600"
                    onClick={handleLevelComplete}
                  >
                    Проверить
                  </motion.button>
                </motion.div>
                
                {taskCompleted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                  >
                    <p className="text-2xl font-bold text-green-400 mb-2">Молодец!</p>
                    <p className="text-gray-400">
                      Переход к карте через несколько секунд...
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </DndProvider>
  );
}
