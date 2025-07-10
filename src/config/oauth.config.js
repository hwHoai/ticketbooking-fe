const { VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID } = import.meta.env;

export const oauthConfig = {
  domain: VITE_AUTH0_DOMAIN,
  clientId: VITE_AUTH0_CLIENT_ID,
  audience: 'https://huuhoai.jp.auth0.com/api/v2/',
  authorizationParams: {
    redirect_uri: window.location.origin
  }
};
