// Apollo
import { useMutation, useApolloClient } from '@apollo/client'
import * as graph from '@graphql/graph'

// Utils
// import AsyncStorage from '@react-native-community/async-storage'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import update from 'immutability-helper'


type MutateArgs = graph.SignUpArgs['input']

export default () => {

    const client = useApolloClient();

    const [signUp, result] = useMutation<
        graph.SignUpResult,
        graph.SignUpArgs
    >(graph.SIGN_UP);

    const mutate = async (args: MutateArgs) => {

        const result = await signUp({
            variables: {
                input: args,
            },
        });

        // const { refreshToken, accessToken, user } = result.data.signUp;

        // const role = user.roles[0].name;
        // const method = 'CREDENTIALS';

        // await AsyncStorage.multiSet([
        //     ['@REFRESH_TOKEN', refreshToken],
        //     ['@ACCESS_TOKEN', accessToken],
        //     ['@AUTH_METHOD', method],
        //     ['@ROLE', role],
        // ]);

        // const previous = client.cache.readQuery<
        //     graph.AuthenticatedResult
        // >({ query: graph.AUTHENTICATED });

        // const data = update(previous, {
        //     authenticated: { $set: true },
        //     role: { $set: role },
        // });
        
        // client.cache.writeQuery({
        //     query: graph.AUTHENTICATED,
        //     data,
        // });
    };

    return [mutate, result] as [typeof mutate, typeof result]
}