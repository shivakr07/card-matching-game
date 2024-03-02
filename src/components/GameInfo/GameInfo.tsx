import React, { useEffect, useState } from 'react';
import { medal } from '../../config/icons';
import ScoreCard from '../ScoreCard/ScoreCard';
import './style.css';

interface GameInfoProps {
  moves: number;
  score:  number;
  timer?: string;
}

const GameInfo: React.FC<GameInfoProps> = ({ score }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const maxScore = 6;
    const width = (Number(score) / maxScore) * 100;
    setProgressWidth(width);
  }, [score]);

  return (
    <div className="top-header">
      {/* Score Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressWidth}%` }} />
      </div>

      <ScoreCard icon={medal} title="Score" value={score} />
    </div>
  );
};

export default GameInfo;
