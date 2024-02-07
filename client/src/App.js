import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const {tg, user, onClose, onToggleButton} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      work
      <button onClick={onClose}>Закрыть</button>
      <div>{user?.username}</div>
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
