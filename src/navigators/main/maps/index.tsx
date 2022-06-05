import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapsStackParamList, MapsStackRouteName } from '../../../types';
import { Maps } from '../../../screens';
import { EventDetails } from '../../../screens/main/maps';
import { colors } from '../../../styles';

const MapsStack = createNativeStackNavigator<MapsStackParamList>();

const MapsNavigator: FC = () => {
  return (
    <MapsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName={MapsStackRouteName.Maps}>
      <MapsStack.Screen name={MapsStackRouteName.Maps} component={Maps} />
      <MapsStack.Screen
        name={MapsStackRouteName.EventDetails}
        component={EventDetails}
      />
    </MapsStack.Navigator>
  );
};

export default MapsNavigator;
