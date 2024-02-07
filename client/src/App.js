import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const {tg, user, onClose, onToggleButton} = useTelegram();

  useEffect(() => {
    tg.ready();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      work<br/>
      <button onClick={onClose}>Закрыть</button><br/>
      <div>name: {user?.username}</div><br/>
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
