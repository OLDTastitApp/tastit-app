// Apollo
import { setContext } from '@apollo/client/link/context'
import {
    enableExperimentalFragmentVariables,
    InMemoryCache,
    ApolloClient,
    ApolloLink,
    HttpLink,
} from '@apollo/client'

// Links
import getAuthLink from './authLink'

// Resolvers
import resolvers from './resolvers'

// Store
import { initializeStore } from './store'

// Services
// import AsyncStorage from '@react-native-community/async-storage'
// import * as OAuth from '@services/oauth'

// Graph
// import * as graph from './graph/auth/refreshToken'

// Utils
// import decode from 'jwt-decode'

// Env
import * as env from '@env'


// Cache
const cache = new InMemoryCache();

// Client
export const client = new ApolloClient({
    cache,
    // resolvers,
    // link: ApolloLink.from([authLink, httpLink]),
});

// Links
const authLink = getAuthLink(client);
const httpLink = new HttpLink({ uri: env.GraphQLUri });
console.log(`GraphQLUri: ${env.GraphQLUri}`)
const link = ApolloLink.from([authLink, httpLink]);

// Initialize client
client.setResolvers(resolvers);
client.setLink(link);
// client.setR

// Features
enableExperimentalFragmentVariables();

// Initialize store
initializeStore(cache);

// Set reset store callback
client.onResetStore(
    () => initializeStore(cache)
);

export default client