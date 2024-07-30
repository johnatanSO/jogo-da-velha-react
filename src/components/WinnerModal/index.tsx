import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@mui/material";
import style from './WinnerModal.module.scss'

type Props = {
  open: boolean
  handleClose: () => void
}

export function WinnerModal({open, handleClose}: Props) {
  return (
    <Modal className={style.overlay} open={open} onClose={handleClose}>
      <section className={style.modalContainer}>
        <header>
          <h2>Título</h2>
          <button type="button">
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        </header>

        <main>

        </main>

        <footer>

        </footer>
      </section>
    </Modal>
  )
}