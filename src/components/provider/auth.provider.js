import { createContext } from 'react';

export const AuthProvider = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userGlobalInfo: {
    name: ''
  },
  setUserGlobalInfo: () => {}
});
