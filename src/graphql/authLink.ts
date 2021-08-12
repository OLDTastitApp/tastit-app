// Apollo
import { NormalizedCacheObject, ApolloClient } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// Services
import AsyncStorage from '@react-native-community/async-storage'

// Graph
import * as graph from './graph/auth/refreshToken'

// Utils
import { isExpired } from '@utils/auth'

// Env
import * as env from '@env'


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
                
                // var result = await client.mutate<
                //     graph.RefreshTokenResult,
                //     graph.RefreshTokenArgs
                // >({
                //     mutation: graph.REFRESH_TOKEN,
                //     variables: {
                //         input: {
                //             token: refreshToken,
                //         },
                //     },
                // });

                // const { refreshToken: tokens } = result.data;
                // refreshToken = tokens.refreshToken;
                // accessToken = tokens.accessToken;

                // await AsyncStorage.multiSet([
                //     ['refreshToken', refreshToken],
                //     ['accessToken', accessToken],
                // ]);
                console.log(`env: ${refreshToken}`)
                const result = await fetch(env.GraphQLUri, {
                    headers: {
                        'Content-Type': 'application/json',
                        'App-Version': env.version,
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        variables: {
                            token: refreshToken,
                        },
                        query: graph.REFRESH_TOKEN_QUERY,
                    }),
                }).then<{
                    errors?: {
                        message: string,
                    }[],
                    data: {
                        refreshToken: {
                            refreshToken: string,
                            accessToken: string,
                        },
                    },
                }>(value => value.json());
            
                const errorCodes = ['SESSION_EXPIRED', 'UNAUTHORIZED'];

                const error = result.errors?.find(({ message }) => (
                    errorCodes.includes(message)
                ));
            
                if (error) {
                    throw Error(error.message);
                }

                const { refreshToken: tokens } = result.data;

                accessToken = tokens.accessToken;

                await AsyncStorage.multiSet([
                    ['@REFRESH_TOKEN', tokens.refreshToken],
                    ['@ACCESS_TOKEN', tokens.accessToken],
                ]);
            }
            
            const authorization = `Bearer ${accessToken}`;

            return {
                headers: {
                    ...headers,
                    'Authorization': authorization,
                },
            };
    
        } catch (e) {
            console.log(e);
            return { headers };
        }
    })
}