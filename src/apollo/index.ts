import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import * as mutations from './mutations';
// import * as queries from './queries';
import { AsyncStorageKeys } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Apollo = {
  client: ApolloClient<any>;
  queries: any;
  mutations: any;
};

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(async (_: any, { headers }: any) => {
    const token = await AsyncStorage.getItem(AsyncStorageKeys.ACCESS_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return forward(operation);
});

const link = ApolloLink.from([
  authLink,
  new HttpLink({ uri: 'http://localhost:3000/graphql' }),
]);

const client = (() => {
  return new ApolloClient({
    link,
    defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
    cache: new InMemoryCache(),
  });
})();

const Apollo = {
  client,
  mutations,
  // queries,
};

export { Apollo };
