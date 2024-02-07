import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/routes/AppRouter';

function App() {
  const {tg} = useTelegram();

  useEffect(() => {
    tg.ready();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <div className="App">
        <AppRouter/>
      </div>
    </Router>
  );
}

export default App;
