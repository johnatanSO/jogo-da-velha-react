import { useState } from 'react'
import { Square } from '../Square'
import style from './Board.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { Position } from './interfaces/Position'
import { IPlayerData } from './interfaces/IPlayerData'
import { WinnerModal } from '../WinnerModal'

let winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

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
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [winnerData, setWinnerData] = useState<IPlayerData | null>(null)
  const [modalWinnerOpened, setModalWinnerOpened] = useState<boolean>(false)

  function handleSelectPosition(positionId: string) {
    if (gameOver) return

    const copyPositions = [...positions]

    copyPositions.forEach((position) => {
      if (position.id === positionId) {
        position.marked = true
        position.symbol = currentPlayerSymbol
      }
    })

    setPositions(copyPositions)

    definePlayerTurn()

    verifyGameOver()
  }

  function definePlayerTurn() {
    if (currentPlayerSymbol === 'x') {
      setCurrentPlayerSymbol('o')
      return
    }

    setCurrentPlayerSymbol('x')
  }

  function verifyGameOver() {
    for (const sequence of winStates) {
      const firstPosition = sequence[0];
      const secondPosition = sequence[1];
      const thirdPosition = sequence[2];

      if (
        positions[firstPosition].symbol === positions[secondPosition].symbol && 
        positions[firstPosition].symbol === positions[thirdPosition].symbol && 
        positions[firstPosition].symbol !== null) {
          const winner = positions[firstPosition]

          setWinnerData(winner)
          setModalWinnerOpened(true)
          setGameOver(true)

          break
      }
    }
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
            gameOver={gameOver}
          />
        )
      })}

      {modalWinnerOpened && winnerData && (
        <WinnerModal 
          open={modalWinnerOpened} 
          handleClose={() => {
            setModalWinnerOpened(false)
            setWinnerData(null)
          }} 
        />
      )}
    </section>
  )
}