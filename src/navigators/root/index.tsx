import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackRouteName, RootStackParamList } from '../../types';
import AuthNavigator from '../auth';
import { useAuthContext } from '../../context/auth.context';
import MainNavigator from '../main';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RootStackRouteName.AuthNavigator}>
      {isLoggedIn ? (
        <RootStack.Screen
          name={RootStackRouteName.MainNavigator}
          component={MainNavigator}
        />
      ) : (
        <RootStack.Screen
          name={RootStackRouteName.AuthNavigator}
          component={AuthNavigator}
        />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
