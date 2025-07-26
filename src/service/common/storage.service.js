export class StorageService {
  static setToken(token, expiresIn = 3600) {
    try {
      const tokenData = {
        access_token: token,
        expires_at: Date.now() + expiresIn * 1000,
        created_at: Date.now()
      };

      // Check size before storing
      const dataSize = new Blob([JSON.stringify(tokenData)]).size;
      console.log('Token data size:', dataSize, 'bytes');

      if (dataSize > 5 * 1024 * 1024) {
        // 5MB localStorage limit
        throw new Error('Token too large for localStorage');
      }

      localStorage.setItem('auth_token', JSON.stringify(tokenData));

      return true;
    } catch (error) {
      console.error('Failed to store token:', error);
      return false;
    }
  }

  static getToken() {
    try {
      const tokenData = localStorage.getItem('auth_token');
      if (!tokenData) return null;

      const parsed = JSON.parse(tokenData);

      // Check if token is expired
      if (Date.now() > parsed.expires_at) {
        this.clearToken();
        return null;
      }

      return parsed.access_token;
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  }

  static isTokenValid() {
    const tokenInStorage = this.getToken();

    return !!tokenInStorage;
  }

  static clearToken() {
    localStorage.removeItem('auth_token');
  }
}
