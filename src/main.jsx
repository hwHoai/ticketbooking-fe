import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './config/i18n';
import { Auth0Provider } from '@auth0/auth0-react';
import { oauthConfig } from './config/oauth.config';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider {...oauthConfig}>
      <App />
    </Auth0Provider>
  </StrictMode>
);
