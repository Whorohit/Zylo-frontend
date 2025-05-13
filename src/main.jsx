import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root')).render(
 
    <Provider
      store={store}
    >
      <App />
    </Provider>
  
);
