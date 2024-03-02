// import React from 'react'
// import { flip, medal, stopwatch } from '../../config/icons'
// import ScoreCard from '../ScoreCard/ScoreCard'
// import './style.css'

// interface GameInfoProps {
//   moves: number
//   score: string | number
//   timer?: string
// }

// const GameInfo: React.FC<GameInfoProps> = ({ moves, score, timer }) => (
//   <div className="top-header" >
//     <ScoreCard icon={medal} title="Score" value={score} />
//     <ScoreCard icon={flip} title="Flips" value={moves} />
//     {timer && <ScoreCard icon={stopwatch} title="Timer" value={timer} />}
//   </div>
// )

// export default GameInfo


// import React, { useEffect, useState } from 'react';
// import { flip, medal, stopwatch } from '../../config/icons';
// import ScoreCard from '../ScoreCard/ScoreCard';
// import './style.css';

// interface GameInfoProps {
//   moves: number;
//   score: string | number;
//   timer?: string;
// }

// const GameInfo: React.FC<GameInfoProps> = ({ moves, score, timer }) => {
//   const [progressWidth, setProgressWidth] = useState(0);

//   useEffect(() => {
//     // Calculate the width of the progress bar based on the score
//     const maxWidth = 100;
//     const width = (Number(score) / 100) * maxWidth;
//     setProgressWidth(width);
//   }, [score]);

//   return (
//     <div className="top-header">
//       {/* Score Progress Bar */}
//       <div className="progress-bar-container">
//         <div className="progress-bar" style={{ width: `${progressWidth}%` }} />
//       </div>

//       <ScoreCard icon={medal} title="Score" value={score} />
//       {/* <ScoreCard icon={flip} title="Flips" value={moves} />
//       {timer && <ScoreCard icon={stopwatch} title="Timer" value={timer} />} */}
//     </div>
//   );
// };

// export default GameInfo;




import React, { useEffect, useState } from 'react';
import { medal } from '../../config/icons';
import ScoreCard from '../ScoreCard/ScoreCard';
import './style.css';

interface GameInfoProps {
  moves: number;
  score: string | number;
  timer?: string;
}

const GameInfo: React.FC<GameInfoProps> = ({ score }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    // Calculate the width of the progress bar based on the score and maximum score
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
