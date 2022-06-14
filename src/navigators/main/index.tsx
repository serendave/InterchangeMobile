import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackParamList, MainStackRouteName } from '../../types';
import { colors } from '../../styles';
import { New } from '../../screens';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapsNavigator from './maps';
import ItemsNavigator from './items';
import ProfileNavigator from './profile';

const MainStack = createBottomTabNavigator<MainStackParamList>();

const MainNavigator: FC = () => {
  return (
    <MainStack.Navigator
      detachInactiveScreens
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'MapsNavigator') {
            return <Icon name="map" size={size} color={color} />;
          } else if (route.name === 'ItemsNavigator') {
            return <Icon name="menu" size={size} color={color} />;
          } else if (route.name === 'New') {
            return <Icon name="plus" size={size} color={color} />;
          } else if (route.name === 'ProfileNavigator') {
            return <MaterialIcon name="account" size={size} color={color} />;
          }
        },
        tabBarInactiveTintColor: colors.gray,
        tabBarActiveTintColor: colors.secondary,
      })}
      initialRouteName={MainStackRouteName.MapsNavigator}>
      <MainStack.Screen
        name={MainStackRouteName.MapsNavigator}
        component={MapsNavigator}
        options={{ title: 'Maps', headerShown: false }}
      />
      <MainStack.Screen
        name={MainStackRouteName.ItemsNavigator}
        component={ItemsNavigator}
        options={{ title: 'Items', headerShown: false }}
      />
      <MainStack.Screen
        name={MainStackRouteName.New}
        component={New}
        options={{ title: 'New Item' }}
      />
      <MainStack.Screen
        name={MainStackRouteName.ProfileNavigator}
        component={ProfileNavigator}
        options={{ title: 'Profile', headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
