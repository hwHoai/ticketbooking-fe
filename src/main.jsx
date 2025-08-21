import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './config/i18n';
import { Auth0Provider } from '@auth0/auth0-react';
import { oauthConfig } from './config/oauth.config';
import { Provider } from 'react-redux';
import store from './config/redux.store.config';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider {...oauthConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </StrictMode>
);
