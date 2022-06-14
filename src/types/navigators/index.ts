import { NavigatorScreenParams } from '@react-navigation/native';
import { ImageType } from '../common';

export enum RootStackRouteName {
  AuthNavigator = 'AuthNavigator',
  MainNavigator = 'MainNavigator',
}

export enum AuthStackRouteName {
  SignUp = 'SignUp',
  SignIn = 'SignIn',
}

export enum MainStackRouteName {
  MapsNavigator = 'MapsNavigator',
  ItemsNavigator = 'ItemsNavigator',
  New = 'New',
  ProfileNavigator = 'ProfileNavigator',
}

export enum MapsStackRouteName {
  Maps = 'Maps',
  EventDetails = 'EventDetails',
  AddFriend = 'AddFriend',
}

export enum ItemStackRouteName {
  ItemsList = 'ItemsList',
  ItemDetails = 'ItemDetails',
}

export enum ProfileStackRouteName {
  Profile = 'Profile',
  UserInfo = 'UserInfo',
  MyItems = 'MyItems',
  MyEvents = 'MyEvents',
  EventDetails = 'EventDetails',
}

export type RootStackParamList = {
  AuthNavigator: NavigatorScreenParams<AuthStackParamList>;
  MainNavigator: NavigatorScreenParams<MainStackParamList>;
};

export type AuthStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

export type MainStackParamList = {
  MapsNavigator: NavigatorScreenParams<MapsStackParamList>;
  ItemsNavigator: NavigatorScreenParams<ItemStackParamList>;
  New: undefined;
  ProfileNavigator: NavigatorScreenParams<ProfileStackParamList>;
};

export type MapsStackParamList = {
  Maps: undefined;
  EventDetails: { id: string };
  AddFriend: { id: string };
};

export type ItemStackParamList = {
  ItemsList: undefined;
  ItemDetails: { id: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  UserInfo: undefined;
  MyItems: undefined;
  MyEvents: undefined;
  EventDetails: { id: string };
};

export type CommonScreensParamList = {
  Gallery: {
    images: ImageType[];
    position?: number;
    updateImageArray?: (array: ImageType[]) => void;
    title?: string;
    bgColor?: string;
  };
};
