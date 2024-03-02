import React from 'react'
import { cardFront } from '../../config/icons'
import './style.css'

interface CardProps {
  shapeId: string
  uniqueId: string
  shape?: string
  handleCardClick: (params: { shapeId: string; uniqueId: string }) => void
  isFlipped: boolean
}

const Card: React.FC<CardProps> = ({
  uniqueId,
  shape,
  shapeId,
  handleCardClick,
  isFlipped,
}) => {
  return (
    <div
      className={`memory-card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => handleCardClick({ shapeId, uniqueId })}
      key={uniqueId}
    >
      <div className="card-content">
        <div className="card-front">
          <img src={cardFront} className="card-front" alt="Card Front" />
        </div>
        <div className="card-back">
          <img src={shape} className="number icon" alt="Number icon" />
        </div>
      </div>
    </div>
  )
}

export default Card
