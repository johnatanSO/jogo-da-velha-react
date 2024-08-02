import style from './Header.module.scss'

export function Header() {
  return (
    <header className={style.headerContainer}>
      <h2>Jogo da velha</h2>

      <button className={style.loginButton} type="button">
        Login
      </button>
    </header>
  )
}
