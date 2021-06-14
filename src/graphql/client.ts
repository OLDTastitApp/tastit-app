// Apollo
import { setContext } from '@apollo/client/link/context'
import {
    enableExperimentalFragmentVariables,
    InMemoryCache,
    ApolloClient,
    ApolloLink,
    HttpLink,
} from '@apollo/client'

// Resolvers
import resolvers from './resolvers'

// Store
import { initializeStore } from './store'

// Cache
import cache from './cache'

// Services
import * as OAuth from '@services/oauth'

// Env
import env from '@env'

// Links
const httpLink = new HttpLink({ uri: env.GraphQLUri })

const authLink = setContext(async (_, { headers }) => {
    try {
        const client = OAuth.getClient('app');
        const token = await client.getToken();

        return { headers };
        
        // if (!token) return { headers };
        
        // const authorization = `Bearer ${token.accessToken}`;
        // return {
        //     headers: {
        //         ...headers,
        //         authorization,
        //     },
        // };

    } catch (e) {
        console.log(e);
        return { headers };
    }
})

const client = new ApolloClient({
    cache,
    resolvers,
    link: ApolloLink.from([authLink, httpLink]),
})

// Features
enableExperimentalFragmentVariables()

// Initialize store
initializeStore(cache)

// Set reset store callback
client.onResetStore(
    () => initializeStore(cache)
)

export default client