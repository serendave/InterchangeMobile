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
import { User } from '../types';

interface IAuthContext {
  userData?: User;
  isLoggedIn: boolean;
  setUserData: (user: User) => void;
  setIsLoggedIn: (value: boolean) => void;
  logOut?: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  userData: undefined,
  isLoggedIn: false,
  setUserData: () => {},
  setIsLoggedIn: () => {},
  logOut: () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();

  const logOut = useCallback(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  useEffect(() => {
    AsyncStorage.getItem(AsyncStorageKeys.ACCESS_TOKEN).then((token) => {
      setIsLoggedIn(!!token);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        isLoggedIn,
        setIsLoggedIn,
        setUserData,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
