import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapsStackParamList, MapsStackRouteName } from '../../../types';
import {
  EventDetails,
  Maps,
  AddFriend,
  CreateEvent,
} from '../../../screens/main/maps';
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
        name={MapsStackRouteName.CreateEvent}
        component={CreateEvent}
      />
      <MapsStack.Screen
        name={MapsStackRouteName.EventDetails}
        component={EventDetails}
      />
      <MapsStack.Screen
        name={MapsStackRouteName.AddFriend}
        component={AddFriend}
      />
    </MapsStack.Navigator>
  );
};

export default MapsNavigator;
