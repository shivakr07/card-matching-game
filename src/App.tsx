import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card/Card'
import GameInfo from './components/GameInfo/GameInfo'
import GameModal from './components/GameModal/GameModal'
import Header from './components/Header/Header'
import {
  INITIAL_SCORE,
  INITIAL_TIMER,
  SUCCESS_SCORE,
} from './config/constants'
import shapes, { Shape } from './data'
import { duplicateArray, shuffleArray } from './utils'

interface CardType {
  shapeId: string
  uniqueId: string
  shape?: string
}

function App() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<CardType[]>([])
  const [matchedCards, setMatchedCards] = useState<CardType[]>([])
  const [moves, setMoves] = useState<number>(0)
  const [timer, setTimer] = useState<number>(INITIAL_TIMER)
  const [score, setScore] = useState<number>(INITIAL_SCORE)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [win, setWin] = useState<boolean>(false)
  const [gameStarted, setGameStarted] = useState<boolean>(false)

  const resetGame = () => {
    const shuffledCards = shuffleArray(
      duplicateArray(shapes).map((shape: Shape) => ({
        shapeId: shape.shapeId,
        uniqueId: shape.uniqueId,
        shape: shape.shape,
      }))
    )
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedCards([])
    setMoves(0)
    setTimer(INITIAL_TIMER)
    setScore(INITIAL_SCORE)
    setShowModal(false)
    setGameStarted(false) // Reset the firstCardClicked state
  }

  useEffect(() => {
    const shuffledCards: CardType[] = shuffleArray(
      duplicateArray(shapes).map((shape: Shape) => ({
        shapeId: shape.shapeId,
        uniqueId: shape.uniqueId,
        shape: shape.shape,
      }))
    )
    setCards(shuffledCards)
  }, [setCards])

  const handleCardClick = (card: CardType) => {
    if (!gameStarted) {
      // Start the timer when the first card is clicked
      setGameStarted(true)
    }
    // Check if the card is already flipped
    if (
      flippedCards.some((flippedCard) => flippedCard.uniqueId === card.uniqueId) ||
      matchedCards.some((matchedCard) => matchedCard.uniqueId === card.uniqueId)
    ) {
      return // Do nothing if the card is already flipped or matched
    }

    setFlippedCards((prevFlippedCards: CardType[]) => [
      ...prevFlippedCards,
      { shapeId: card.shapeId, uniqueId: card.uniqueId, shape: card.shape },
    ])

    setMoves((prev) => prev + 1)
  }

  useEffect(() => {
    if (!win && gameStarted) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [win, gameStarted])

  const checkGameCompletion = (): boolean => {
    return matchedCards.length === cards.length
  }

  useEffect(() => {
    if (cards.length > 0) {
      if (timer === 0 || checkGameCompletion()) {
        setShowModal(true)
        setWin(checkGameCompletion()) // Set win state based on game completion
      }
    }
  }, [timer, checkGameCompletion, cards.length])

  useEffect(() => {
    const isMatch = flippedCards[0]?.shapeId === flippedCards[1]?.shapeId

    if (flippedCards.length === 2 && isMatch) {
      if (isMatch) {
        let match = flippedCards
        setMatchedCards([...matchedCards, ...match])
        // If the card matches, add 10 to the score
        setScore((prev) => prev + SUCCESS_SCORE)
      }
      setFlippedCards([])
    }
    if (flippedCards.length === 2 && !isMatch) {
      setTimeout(() => {
        setFlippedCards([])
        // In case of a mismatch, deduct 5 from the score
        // setScore((prev) => prev - FAILURE_SCORE)
        setScore((prev) => prev)
      }, 700)
    }
  }, [flippedCards.length, matchedCards])

  const handleResetGame = () => {
    resetGame()
  }

  return (
    <div>
      <Header />
      <GameInfo moves={moves} score={score} timer={timer.toString()} />
      <div className="cards-container">
        <div className="left-section">
          {cards.slice(0, 6).map(({ shapeId, uniqueId, shape }) => (
            <Card
              key={uniqueId}
              uniqueId={uniqueId}
              shapeId={shapeId}
              shape={shape}
              isFlipped={
                flippedCards.some((item) => item.uniqueId === uniqueId) ||
                matchedCards.some((item) => item.uniqueId === uniqueId)
              }
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
        <div className="gap" /> {/* Add styling or margin here for the gap */}
        <div className="right-section">
          {cards.slice(6).map(({ shapeId, uniqueId, shape }) => (
            <Card
              key={uniqueId}
              uniqueId={uniqueId}
              shapeId={shapeId}
              shape={shape}
              isFlipped={
                flippedCards.some((item) => item.uniqueId === uniqueId) ||
                matchedCards.some((item) => item.uniqueId === uniqueId)
              }
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      {showModal && (
        <GameModal
          moves={moves}
          score={score}
          win={win}
          handleResetGame={handleResetGame}
        />
      )}
    </div>
  )
}

export default App
