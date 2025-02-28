import { Character, Product, AnalysisData } from '../../../types/game';
import LevelSummary from '../LevelSummary';

interface Level1SummaryProps {
  character: Character;
  product: Product;
  analysis: AnalysisData;
  onComplete: () => void;
}

export default function Level1Summary({
  character,
  product,
  analysis,
  onComplete
}: Level1SummaryProps) {
  const skills = [
    {
      icon: "/icons/target.png",
      name: "Анализ аудитории",
      description: "Определение и сегментация целевой аудитории продукта"
    },
    {
      icon: "/icons/competition.png",
      name: "Анализ конкурентов",
      description: "Исследование рынка и конкурентной среды"
    },
    {
      icon: "/icons/strategy.png",
      name: "Стратегическое мышление",
      description: "Формирование рекомендаций на основе анализа"
    }
  ];

  const results = (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="font-bold text-white mb-2">Выбранный продукт</h3>
        <p className="text-gray-300">{product.title}</p>
      </div>
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="font-bold text-white mb-2">Анализ аудитории</h3>
        <p className="text-gray-300">{analysis.audience}</p>
      </div>
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="font-bold text-white mb-2">Анализ конкурентов</h3>
        <p className="text-gray-300">{analysis.competitors}</p>
      </div>
    </div>
  );

  const reward = {
    id: "mace_analyst",
    name: "Булава аналитика",
    description: "Помогает разбивать сложные задачи на простые части",
    imagePath: "/items/rewards/mace_analyst.png"
  };

  return (
    <LevelSummary
      character={character}
      levelNumber={1}
      levelTitle="Чему научились"
      skills={skills}
      results={results}
      reward={reward}
      onComplete={onComplete}
    />
  );
}