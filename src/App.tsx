import './styles/globals.scss'
import { Header } from './components/Header'
import { Board } from './components/Board'

export function App() {
  return (
    <div className="appContainer">
      <Header />

      <Board />
    </div>
  )
}
