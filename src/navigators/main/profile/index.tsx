import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList, ProfileStackRouteName } from '../../../types';
import { colors } from '../../../styles';
import { MyEvents, MyItems, Profile, UserInfo } from '../../../screens';

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator: FC = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName={ProfileStackRouteName.Profile}>
      <ProfileStack.Screen
        name={ProfileStackRouteName.Profile}
        component={Profile}
      />
      <ProfileStack.Screen
        name={ProfileStackRouteName.UserInfo}
        component={UserInfo}
      />
      <ProfileStack.Screen
        name={ProfileStackRouteName.MyItems}
        component={MyItems}
      />
      <ProfileStack.Screen
        name={ProfileStackRouteName.MyEvents}
        component={MyEvents}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
