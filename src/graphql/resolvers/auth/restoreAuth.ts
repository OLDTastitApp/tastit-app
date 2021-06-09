// Apollo
import * as graph from '@graphql/graph'

// Services
import { OAuth } from '@services'

// Utils
import update from 'immutability-helper'

// Types
import { AsyncLocalResolver } from '../../types/resolver'


export const restoreAuth: AsyncLocalResolver<
    graph.RestoreAuthPayload, never, never
> = async (_root, _args, { cache, /*client*/ }) => {

    // Refresh token if expired
    const token = await OAuth
        .getClient('app')
        .getToken();

    let data = cache.readQuery<
        graph.AuthenticatedResult
    >({ query: graph.AUTHENTICATED });

    // Get token from cache
    if (token) {

        // await client.query({
        //     query: graph.ME,
        // });

        data = update(data, {
            authenticated: {
                $set: true,
            },
        });
        
        cache.writeQuery({
            data, query: graph.AUTHENTICATED,
        });
    }

    return {
        authenticated: data.authenticated,
        __typename: 'RestoreAuthPayload',
        hasExpired: false,
    };
}