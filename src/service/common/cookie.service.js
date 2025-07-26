import LZString from 'lz-string';
export class CookieService {
  static setCookie = (name, value = '', expire, path = '/') => {
    // const compressed = LZString.compressToUTF16(value);
    const compressed = btoa(value);
    const originalSize = new Blob([value]).size;
    const compressedSize = new Blob([compressed]).size;
    console.log(`Original size: ${originalSize} bytes, Compressed size: ${compressedSize} bytes`);
    document.cookie = `${name}=${compressed}; expires=${expire}; path=${path}`;
  };

  static getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim());
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return undefined;
  };

  static removeCookie = (name, path = '/') => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
  };
}
