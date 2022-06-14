import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ItemStackParamList, ItemStackRouteName } from '../../../types';
import { colors } from '../../../styles';
import { ItemsList, ItemDetails } from '../../../screens';

const ItemsStack = createNativeStackNavigator<ItemStackParamList>();

const ItemsNavigator: FC = () => {
  return (
    <ItemsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName={ItemStackRouteName.ItemsList}>
      <ItemsStack.Screen
        name={ItemStackRouteName.ItemsList}
        component={ItemsList}
      />
      <ItemsStack.Screen
        name={ItemStackRouteName.ItemDetails}
        component={ItemDetails}
      />
    </ItemsStack.Navigator>
  );
};

export default ItemsNavigator;
