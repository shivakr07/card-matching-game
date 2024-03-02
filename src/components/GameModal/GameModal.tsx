import { refresh } from '../../config/icons'
import './style.css'

interface GameInfoProps {
  moves: number
  score: string | number
  win: boolean
  handleResetGame: () => void
}

const GameModal: React.FC<GameInfoProps> = ({  score, win, handleResetGame }) => {
  return (
    <div className="modal">
      <div className="modal-content flex-center">
        <img className="modal-icon" />
        <h3 className="modal-title">{`${
          win ? `Yay! Earned ${score} Banana's` : 'Next time, champ! Keep going!'
        }`}</h3>
        <img 
          src="https://i.pinimg.com/736x/d5/aa/a4/d5aaa4525e9a85a4d7b5cdfeef10b9f2.jpg"
          className="star-icon"
          alt="game status"
        />
        <img
          src={refresh}
          className="refresh-icon"
          alt="refresh game"
          onClick={handleResetGame}
        />
      </div>
    </div>
  )
}

export default GameModal
