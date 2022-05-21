import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp, SignIn } from '../../screens';
import { AuthStackRouteName, AuthStackParamList } from '../../types';
import { colors } from '../../styles';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName={AuthStackRouteName.SignUp}>
      <AuthStack.Screen
        name={AuthStackRouteName.SignUp}
        component={SignUp}
        options={{ title: 'Sign Up' }}
      />
      <AuthStack.Screen
        name={AuthStackRouteName.SignIn}
        component={SignIn}
        options={{ title: 'Sign In' }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
