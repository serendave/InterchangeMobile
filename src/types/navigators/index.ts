export enum RootStackRouteName {
  AuthNavigator = 'AuthNavigator',
  MainNavigator = 'MainNavigator',
}

export enum AuthStackRouteName {
  SignUp = 'SignUp',
  SignIn = 'SignIn',
}

export type RootStackParamList = {
  AuthNavigator: undefined;
  MainNavigator: undefined;
};

export type AuthStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
};
