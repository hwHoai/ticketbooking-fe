export class Cookie {
  static set = (name, value = '', expire, path = '/') => {
    if (!value) {
      console.warn(`Cookie value for ${name} is empty. Not setting cookie.`);
      return;
    }
    document.cookie = `${name}=${value}; expires=${expire}; path=${path}`;
  };

  static get = (name) => {
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
