import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../config/firebase';
import { User } from 'firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  userData: undefined | User;
  isUserLogged: boolean;
  checkIsAuthenticated: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(localStorage.getItem('user') !== null);
  const [userData, setUserData] = useState<undefined | User>(undefined);

  function checkIsAuthenticated() {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        setIsUserLogged(true);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setIsUserLogged(false);
        setUserData(undefined);
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
