import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackParamList, MainStackRouteName } from '../../types';
import { colors } from '../../styles';
import { Items, Maps, New, Profile } from '../../screens';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const MainStack = createBottomTabNavigator<MainStackParamList>();

const MainNavigator: FC = () => {
  return (
    <MainStack.Navigator
      detachInactiveScreens
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Maps') {
            return <Icon name="map" size={size} color={color} />;
          } else if (route.name === 'Items') {
            return <Icon name="menu" size={size} color={color} />;
          } else if (route.name === 'New') {
            return <Icon name="plus" size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <MaterialIcon name="account" size={size} color={color} />;
          }
        },
        tabBarInactiveTintColor: colors.gray,
        tabBarActiveTintColor: colors.secondary,
      })}
      initialRouteName={MainStackRouteName.Maps}>
      <MainStack.Screen name={MainStackRouteName.Maps} component={Maps} />
      <MainStack.Screen name={MainStackRouteName.Items} component={Items} />
      <MainStack.Screen
        name={MainStackRouteName.New}
        component={New}
        options={{ title: 'New Item' }}
      />
      <MainStack.Screen name={MainStackRouteName.Profile} component={Profile} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
