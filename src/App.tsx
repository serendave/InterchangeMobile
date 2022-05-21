import React, { FC } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthProvider } from './context/auth.context';
import { Apollo } from './apollo';
import { ApolloProvider } from '@apollo/client';
import RootNavigator from './navigators/root';
import { colors } from './styles';

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
    </ApolloProvider>
  );
};

export default App;
