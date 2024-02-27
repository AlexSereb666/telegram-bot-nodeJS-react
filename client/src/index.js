import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PromoCodeStore from './store/PromoCodeStore'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{ 
      promoCode: new PromoCodeStore()
    }}
  >
    <App />
  </Context.Provider>
);
