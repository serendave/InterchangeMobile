import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList, MainStackRouteName } from '../../types';
import { colors } from '../../styles';
import { Maps } from '../../screens';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator: FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName={MainStackRouteName.Maps}>
      <MainStack.Screen name={MainStackRouteName.Maps} component={Maps} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
