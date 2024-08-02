import { v4 as uuidv4 } from 'uuid'

import { useState } from 'react'
import { Square } from '../Square'
import style from './Board.module.scss'
import { WinnerModal } from '../WinnerModal'
import { Position } from './interfaces/Position'
import { IPlayerData } from './interfaces/IPlayerData'

const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function generatePositions() {
  return new Array(9).fill(null).map(() => {
    return {
      id: uuidv4(),
      symbol: null,
      userSelectedId: null,
      marked: false,
    }
  })
}

export function Board() {
  const [positions, setPositions] = useState<Position[]>(generatePositions())
  const [currentPlayerSymbol, setCurrentPlayerSymbol] = useState<
    'x' | 'o' | null
  >('x')
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
      const [firstPosition, secondPosition, thirdPosition] = sequence

      const { symbol: firstSymbol } = positions[firstPosition]
      const { symbol: secondSymbol } = positions[secondPosition]
      const { symbol: thirdSymbol } = positions[thirdPosition]

      if (
        firstSymbol === secondSymbol &&
        firstSymbol === thirdSymbol &&
        firstSymbol !== null
      ) {
        const winner = positions[firstPosition]

        setWinnerData(winner)
        setModalWinnerOpened(true)
        setGameOver(true)

        break
      }
    }
  }

  function handleResetGame() {
    const newPositions = generatePositions()
    setCurrentPlayerSymbol(winnerData?.symbol || null)

    setPositions(newPositions)
    setWinnerData(null)
    setModalWinnerOpened(false)
    setGameOver(false)
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
          handleResetGame={handleResetGame}
          winnerData={winnerData}
        />
      )}
    </section>
  )
}
