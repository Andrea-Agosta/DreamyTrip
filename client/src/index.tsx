import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './routes';
import reportWebVitals from './reportWebVitals';
import { CountirsContestProvider } from './context/countries.context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CountirsContestProvider>
      <App />
    </CountirsContestProvider>
  </React.StrictMode>,
);

reportWebVitals();
