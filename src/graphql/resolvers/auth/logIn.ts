// Apollo
import * as graph from '@graphql/graph'

// Helpers
import logInWithCredentials from './logInWithCredentials'
import logInWithPhone from './logInWithPhone'

// Utils
import update from 'immutability-helper'

// Types
import { AsyncLocalResolver } from '../../types/resolver'


const methods = [
    'credentials',
    // 'facebook',
    // 'google',
    // 'apple',
    'phone',
]

export const logIn: AsyncLocalResolver<
    graph.LogInPayload, never, graph.LogInArgs
> = async (_root, { input }, { cache }) => {

    if (!methods.includes(input.method)) {
        throw Error(`Log in method (${input.method}) not supported`);
    }

    if (input.method === 'phone') {
        var token = await logInWithPhone(input);
    } else if (input.method === 'credentials') {
        token = await logInWithCredentials(input);
    } else /*if (input.method === 'apple')*/ {
        // token = await logInWithApple();
    }

    const previous = cache.readQuery<
        graph.AuthenticatedResult
    >({ query: graph.AUTHENTICATED });

    const data = update(previous, {
        authenticated: {
            $set: true,
        },
    });
    
    cache.writeQuery({
        query: graph.AUTHENTICATED,
        data,
    });

    return {
        __typename: 'LogInPayload',
        token: {
            __typename: 'OAuthToken',
            ...token,
        },
    };
}