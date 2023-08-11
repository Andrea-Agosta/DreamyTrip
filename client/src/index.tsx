import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './routes';
import reportWebVitals from './reportWebVitals';
import { CartItemsContestProvider } from './context/country';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CartItemsContestProvider>
      <App />
    </CartItemsContestProvider>
  </React.StrictMode>,
);

reportWebVitals();
