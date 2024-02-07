import React, { useState, useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const {tg, user, onClose, onToggleButton} = useTelegram();
  const [userData, setUserData] = useState(user); // Используйте состояние для отслеживания данных пользователя

  useEffect(() => {
    tg.ready();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Обновляем данные пользователя, когда они изменяются
  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <div className="App">
      work<br/>
      <button onClick={onClose}>Закрыть</button><br/>
      <div>name: {userData?.username}</div><br/>
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;