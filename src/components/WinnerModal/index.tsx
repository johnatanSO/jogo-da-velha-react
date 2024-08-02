import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '@mui/material'
import { faRepeat, faXmark } from '@fortawesome/free-solid-svg-icons'

import style from './WinnerModal.module.scss'
import { IWinnerData } from './interfaces/IWinnerData'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

type Props = {
  open: boolean
  handleResetGame: () => void
  winnerData: IWinnerData
}

export function WinnerModal({ open, handleResetGame, winnerData }: Props) {
  function getIconPlayer() {
    return winnerData.symbol === 'x' ? faXmark : faCircle
  }

  return (
    <Modal className={style.overlay} open={open}>
      <section className={style.modalContainer}>
        <header>
          <h2>Fim de jogo</h2>
        </header>

        <main>
          <div className={style.winnerContainer}>
            <FontAwesomeIcon
              icon={getIconPlayer()}
              style={{
                color: winnerData.symbol === 'x' ? '#31a2ff' : '#f94449',
              }}
              className={style.iconWinner}
            />
          </div>

          <h3>Vencedor</h3>
        </main>

        <footer>
          <button
            type="button"
            className={style.newGameButton}
            onClick={handleResetGame}
          >
            <FontAwesomeIcon className={style.icon} icon={faRepeat} />
            Jogar novamente
          </button>
        </footer>
      </section>
    </Modal>
  )
}
