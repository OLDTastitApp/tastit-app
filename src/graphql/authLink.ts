// Apollo
import { NormalizedCacheObject, ApolloClient } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// Services
import AsyncStorage from '@react-native-community/async-storage'

// Graph
import * as graph from './graph/auth/refreshToken'

// Utils
import { isExpired } from '@utils/auth'


type Client = ApolloClient<NormalizedCacheObject>

export default (client: Client) => {

    return setContext(async (_, { headers }) => {
        try {
    
            const keys = [
                '@REFRESH_TOKEN',
                '@ACCESS_TOKEN',
                '@ROLE',
            ];
    
            let [
                [, refreshToken],
                [, accessToken],
                [, role],
            ] = await AsyncStorage.multiGet(keys);
    
            if (!accessToken) return { headers };
    
            if (isExpired(accessToken)) {
                var result = await client.mutate<
                    graph.RefreshTokenResult,
                    graph.RefreshTokenArgs
                >({
                    mutation: graph.REFRESH_TOKEN,
                    variables: {
                        input: {
                            token: refreshToken,
                        },
                    },
                });

                const { refreshToken: tokens } = result.data;
                refreshToken = tokens.refreshToken;
                accessToken = tokens.accessToken;

                await AsyncStorage.multiSet([
                    ['refreshToken', refreshToken],
                    ['accessToken', accessToken],
                ]);
            }
            
            const authorization = `Bearer ${accessToken}`;

            return {
                headers: {
                    ...headers,
                    'Role': role,
                    'Authorization': authorization,
                },
            };
    
        } catch (e) {
            console.log(e);
            return { headers };
        }
    })
}