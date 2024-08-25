import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../config/firebase';

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  authToken: string;
  userData: any;
  isUserLogged: boolean;
  checkIsAuthenticated: () => void;
  deleteAuthToken: () => void;
  isAuthenticated: boolean;
  storeAuthToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState('');
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userData, setUserData] = useState({});

  const storeAuthToken = (token: string) => {
    setAuthToken(token);
  };

  const deleteAuthToken = () => {
    setAuthToken('');
  };

  function checkIsAuthenticated() {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLogged(true);
        setUserData(user);
      } else {
        setIsUserLogged(false);
        setUserData({});
      }
    });
  }

  useEffect(() => {
    return checkIsAuthenticated();
  }, []);

  const contextValue = {
    deleteAuthToken,
    authToken,
    userData,
    isUserLogged,
    isAuthenticated: !!authToken,
    storeAuthToken,
    checkIsAuthenticated,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
