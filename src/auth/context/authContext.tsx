import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../config/firebase';

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  userData: any;
  isUserLogged: boolean;
  checkIsAuthenticated: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(localStorage.getItem('user') !== null);
  const [userData, setUserData] = useState({});

  function checkIsAuthenticated() {
    return onAuthStateChanged(auth, (user) => {
      console.log('is auth', user);
      if (user) {
        setIsUserLogged(true);
        setUserData(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setIsUserLogged(false);
        setUserData({});
        localStorage.removeItem('user');
      }
    });
  }

  useEffect(() => {
    return checkIsAuthenticated();
  }, []);

  const contextValue = {
    userData,
    isUserLogged,
    checkIsAuthenticated,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
