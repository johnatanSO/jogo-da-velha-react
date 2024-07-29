import { useState } from 'react'
import { Square } from '../Square'
import style from './Board.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { Position } from './interfaces/Position'

function generatePositions() {
  return new Array(9).fill(null).map(() => {
    return {
      id: uuidv4(), 
      symbol: null,
      userSelectedId: null,
      marked: false
    }
  })
} 

export function Board() {
  const [positions, setPositions] = useState<Position[]>(generatePositions())
  const [currentPlayerSymbol, setCurrentPlayerSymbol] = useState<'x' | 'o' | null>('x')

  function handleSelectPosition(positionId: string) {
    const copyPositions = [...positions]

    copyPositions.forEach((position) => {
      if (position.id === positionId) {
        position.marked = true
        position.symbol = currentPlayerSymbol
      }
    })

    definePlayerTurn()
    setPositions(copyPositions)
  }

  function definePlayerTurn() {
    if (currentPlayerSymbol === 'x') {
      setCurrentPlayerSymbol('o')
      return
    }

    setCurrentPlayerSymbol('x')
  }

  return (
    <section className={style.boardContainer}>
      {positions.map((position) => {
        return (
          <Square 
            key={position.id} 
            marked={position.marked} 
            symbol={position.symbol} 
            userSelectedId={position.userSelectedId}
            handleSelectPosition={handleSelectPosition}
            id={position.id}
          />
        )
      })}
    </section>
  )
}