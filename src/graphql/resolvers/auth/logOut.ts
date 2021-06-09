// Apollo
import * as graph from '@graphql/graph'

// Services
import { OAuth } from '@services'

// Utils
import update from 'immutability-helper'

// Types
import { AsyncLocalResolver } from '../../types/resolver'


export const logOut: AsyncLocalResolver<
    graph.LogOutPayload, never, never
> = async (_root, _args, { cache }) => {

    const previous = cache.readQuery<
        graph.AuthenticatedResult
    >({ query: graph.AUTHENTICATED });

    const data = update(previous, {
        authenticated: {
            $set: false,
        },
    });
    
    cache.writeQuery({
        query: graph.AUTHENTICATED,
        data,
    });

    await OAuth.getClient('app').removeToken();

    return {
        __typename: 'LogOutPayload',
        authenticated: false,
    };
}