import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as mutations from './mutations';
import * as queries from './queries';
import { AsyncStorageKeys } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

type Apollo = {
  client: ApolloClient<any>;
  queries: any;
  mutations: any;
};

const httpLink = createHttpLink({
  uri: `${Config.API_URL}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(AsyncStorageKeys.ACCESS_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = (() => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
    cache: new InMemoryCache(),
  });
})();

const Apollo = {
  client,
  mutations,
  queries,
};

export { Apollo };
