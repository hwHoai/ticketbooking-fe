export class TokenService {
  static decodeToken = (token) => {
    if (!token) return null;

    const base64Token = token.split('.')[1];
    if (!base64Token) return null;

    const payloadToken = base64Token.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payloadToken));
  };

  static setTokenToCookie = (name, token, expire, path = '/') => {
    if (token.length >= 4096) {
      const [header, payload, signature] = token.split('.');
      document.cookie = `${'h_' + name}=${header}; expires=${expire}; path=${path}`;
      document.cookie = `${'s_' + name}=${signature}; expires=${expire}; path=${path}`;
      document.cookie = `${'p_' + name}=${payload}; expires=${expire}; path=${path}`;
      if (payload.length >= 4096) {
        const chunkSize = 1000; // Adjust chunk size as needed
        for (let i = 0; i < payload.length; i += chunkSize) {
          if (i > payload.length) {
            const chunk = payload.slice(i, chunkSize);
            document.cookie = `${'p_' + name}_${Math.floor(i / chunkSize) + 1}=${chunk}; expires=${expire}; path=${path}`;
          }
          const chunk = payload.slice(i, i + chunkSize);
          document.cookie = `${'p_' + name}_${Math.floor(i / chunkSize) + 1}=${chunk}; expires=${expire}; path=${path}`;
        }
        return;
      }
      return;
    }

    document.cookie = `${name}=${token}; expires=${expire}; path=${path}`;
  };

  static isTokenExpired = (token) => {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) return true;

    const currentTime = Date.now() / 1000;
    return decodedToken.exp - currentTime < 5 * 60;
  };
}
