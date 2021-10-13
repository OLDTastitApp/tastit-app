// React
import { useState, useEffect } from 'react'

// Apollo
import { useApolloClient } from '@apollo/client'
import * as graph from '@graphql/graph'

// Utils
// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import update from 'immutability-helper'
import decode from 'jwt-decode'

// Types
import { RoleName } from '@types'


const isExpired = (token: string) => {
    const { exp } = decode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
}

export default () => {

    const [complete, setComplete] = useState(false);
    const client = useApolloClient();

    useEffect(
        () => {
            (async () => {
                try {

                    const keys = [
                        '@REFRESH_TOKEN',
                        '@ACCESS_TOKEN',
                        '@AUTH_METHOD',
                        '@USER_ID',
                        '@ROLE',
                    ];

                    const [
                        [, refreshToken],
                        [, accessToken],
                        [, method],
                        [, userId],
                        [, role],
                    ] = await AsyncStorage.multiGet(keys);

                    if (!refreshToken) {
                        return;
                    }

                    if (isExpired(refreshToken)) {
                        AsyncStorage.multiRemove(keys);
                        // @TODO: Votre session a expirée
                        return;
                    }

                    console.log(`[OK] method: ${method}, role: ${role}`);

                    const previous = client.cache.readQuery<
                        graph.AuthenticatedResult
                    >({ query: graph.AUTHENTICATED });

                    const data = update(previous, {
                        role: { $set: role as RoleName },
                        authenticated: { $set: true },
                        userId: { $set: userId },
                    });
                    
                    client.cache.writeQuery({
                        query: graph.AUTHENTICATED,
                        data,
                    });

                } finally {
                    setComplete(true);
                }
            })();
        },
        []
    );

    return { complete };
}