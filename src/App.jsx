import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/PublicRoute';
import { AuthProvider } from './components/provider/auth.provider';
import { useState } from 'react';

export const App = () => {
  // Initial state for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userGlobalInfo, setUserGlobalInfo] = useState({ name: '' });
  const initialAuthState = {
    isAuthenticated,
    setIsAuthenticated,
    userGlobalInfo,
    setUserGlobalInfo
  };
  return (
    <BrowserRouter>
      <AuthProvider.Provider value={initialAuthState}>
        <Routes>
          {publicRoute.map((route, i) => (
            <Route key={i} {...route} />
          ))}
          {privateRoute.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Routes>
      </AuthProvider.Provider>
    </BrowserRouter>
  );
};

export default App;
