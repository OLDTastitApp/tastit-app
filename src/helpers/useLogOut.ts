// React
import { useState, useRef, useEffect } from 'react'

// Apollo
import { useApolloClient } from '@apollo/client'
import * as graph from '@graphql/graph'

// Utils
import { GoogleSignin } from '@react-native-google-signin/google-signin'
// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginManager } from 'react-native-fbsdk-next'
import update from 'immutability-helper'


type Method = graph.LogInArgs['input']['method']

export default () => {

    const [loading, setLoading] = useState(false);
    const unmountedRef = useRef(false);

    const client = useApolloClient();

    useEffect(
        () => () => { unmountedRef.current = true },
        []
    );

    const mutate = async () => {

        try {
            setLoading(true);

            const method = await AsyncStorage.getItem('@AUTH_METHOD') as Method;
    
            await AsyncStorage.multiRemove([
                '@REFRESH_TOKEN',
                '@ACCESS_TOKEN',
                '@AUTH_METHOD',
                '@USER_ID',
                '@ROLE',
            ]);
    
            const previous = client.cache.readQuery<
                graph.AuthenticatedResult
            >({ query: graph.AUTHENTICATED });
    
            const data = update(previous, {
                authenticated: { $set: false },
                role: { $set: null },
            });
            
            client.cache.writeQuery({
                query: graph.AUTHENTICATED,
                data,
            });
    
            if (method === 'FACEBOOK') {
                LoginManager.logOut();
            } else if (method === 'GOOGLE') {
                await GoogleSignin.signOut();
            }
        } finally {
            if (!unmountedRef.current) {
                setLoading(false);
            }
        }
    };

    const result = { loading };

    return [mutate, result] as [typeof mutate, typeof result]
}