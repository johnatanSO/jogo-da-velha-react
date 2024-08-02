import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '@mui/material'
import { faRepeat } from '@fortawesome/free-solid-svg-icons'

import style from './WinnerModal.module.scss'
import { IWinnerData } from './interfaces/IWinnerData'

type Props = {
  open: boolean
  handleClose: () => void
  handleResetGame: () => void
  winnerData: IWinnerData
}

export function WinnerModal({ open, handleClose, handleResetGame }: Props) {
  return (
    <Modal className={style.overlay} open={open} onClose={handleClose}>
      <section className={style.modalContainer}>
        <header>
          <h2>Fim de jogo</h2>
        </header>

        <main></main>

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
