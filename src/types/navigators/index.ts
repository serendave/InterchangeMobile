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
  Maps = 'Maps',
  Items = 'Items',
  New = 'New',
  Profile = 'Profile',
}

export type RootStackParamList = {
  AuthNavigator: undefined;
  MainNavigator: undefined;
};

export type AuthStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

export type MainStackParamList = {
  Maps: undefined;
  Items: undefined;
  New: undefined;
  Profile: undefined;
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
