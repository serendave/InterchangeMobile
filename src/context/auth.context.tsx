import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AsyncStorageKeys } from '../constants';

interface IAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn?: (value: boolean) => void;
  logOut?: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  logOut: () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logOut = useCallback(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  useEffect(() => {
    AsyncStorage.getItem(AsyncStorageKeys.ACCESS_TOKEN).then(token => {
      if (!token) {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
