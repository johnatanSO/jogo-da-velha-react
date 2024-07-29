import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./Square.module.scss"
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

type Props = {
  marked: boolean
  symbol: null | string
  userSelectedId: null | string
  id: string
  handleSelectPosition: (id: string) => void
}

export function Square({ 
  marked, 
  symbol, 
  userSelectedId, 
  id, 
  handleSelectPosition 
}: Props) {

  function handleClickSquare() {
    if (marked) return
    handleSelectPosition(id)
  }

  function getIconPlayer() {
    return symbol === 'x' ? faXmark : faCircle
  }
  
  return (
    <button 
      onClick={handleClickSquare} 
      className={style.squareButton} 
      disabled={marked}
    >
      {marked && (
        <FontAwesomeIcon style={{
          color: symbol === 'x' ? '#31a2ff' : '#f94449'
        }} className={style.symbol} icon={getIconPlayer()} />
      )}
    </button>
  )
}