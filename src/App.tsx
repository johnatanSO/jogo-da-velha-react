import './styles/globals.scss';
import { Header } from './components/Header';
import { Board } from './components/Board';

function App() {
  return (
    <div className="appContainer">
      <Header />

      <Board />
    </div>
  );
}

export default App;
