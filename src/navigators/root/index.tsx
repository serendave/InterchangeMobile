import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackRouteName, RootStackParamList } from '../../types';
import AuthNavigator from '../auth';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RootStackRouteName.AuthNavigator}>
      <RootStack.Screen
        name={RootStackRouteName.AuthNavigator}
        component={AuthNavigator}
      />
      {/* <RootStack.Screen name="" component={} /> */}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
