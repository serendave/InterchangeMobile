import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
// import * as mutations from './mutations';
// import * as queries from './queries';
import { setContext } from '@apollo/client/link/context';
import { AsyncStorageKeys } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Apollo = {
  client: ApolloClient<any>;
  queries: any;
  mutations: any;
};

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(AsyncStorageKeys.ACCESS_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const link = ApolloLink.from([authLink]);

const client = (() => {
  return new ApolloClient({
    link,
    defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
    cache: new InMemoryCache(),
  });
})();

const Apollo = {
  client,
  // mutations,
  // queries,
};

export { Apollo };
