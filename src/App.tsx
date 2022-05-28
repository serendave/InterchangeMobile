import React, { FC } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { enableLatestRenderer } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/auth.context';
import { Apollo } from './apollo';
import { ApolloProvider } from '@apollo/client';
import RootNavigator from './navigators/root';
import { colors } from './styles';

enableLatestRenderer();

const App: FC = () => {
  return (
    <ApolloProvider client={Apollo.client}>
      <AuthProvider>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: colors.white,
            },
          }}>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
      <Toast />
    </ApolloProvider>
  );
};

export default App;
