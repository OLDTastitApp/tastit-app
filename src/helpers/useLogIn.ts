// Apollo
import { useMutation, useApolloClient } from '@apollo/client'
import * as graph from '@graphql/graph'

// Utils
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import AsyncStorage from '@react-native-community/async-storage'
import update from 'immutability-helper'


type MutateArgs = graph.LogInArgs['input']

export default () => {

    const client = useApolloClient();

    const [logIn, result] = useMutation<
        graph.LogInResult,
        graph.LogInArgs
    >(graph.LOG_IN);

    const mutate = async (args: MutateArgs) => {

        const result = await logIn({
            variables: {
                input: args,
            },
        });

        const { refreshToken, accessToken, user } = result.data.logIn;

        const role = user.roles[0].name;

        await AsyncStorage.multiSet([
            ['@REFRESH_TOKEN', refreshToken],
            ['@ACCESS_TOKEN', accessToken],
            ['@AUTH_METHOD', args.method],
            ['@ROLE', role],
        ]);

        const previous = client.cache.readQuery<
            graph.AuthenticatedResult
        >({ query: graph.AUTHENTICATED });

        const data = update(previous, {
            authenticated: { $set: true },
            role: { $set: role },
        });
        
        client.cache.writeQuery({
            query: graph.AUTHENTICATED,
            data,
        });
    };

    const logInWithFacebook = async () => {
        const result = await LoginManager
            .logInWithPermissions(['public_profile']);

        if (result.isCancelled) return;

        console.log(`OK with Facebook!`);

        const token = await AccessToken.getCurrentAccessToken();
        const accessToken = token.accessToken.toString();

        console.log(`Faceook: ${accessToken}`);
        
        return await mutate({
            method: 'FACEBOOK',
            accessToken,
        });
    };

    const logInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const token = await GoogleSignin.getTokens();
            const { idToken, accessToken } = token;

            return await mutate({
                method: 'GOOGLE',
                accessToken,
                idToken,
            });

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log(`user cancelled the login flow`);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log(`operation (e.g. sign in) is in progress already`);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log(`play services not available or outdated`);
            } else {
                // some other error happened
                console.log(`some other error happened: ${error}`);
            }
        }
    };

    const logInWithApple = async () => {
        // @TODO
    };

    type LogInWithCredentialsArgs = {
        password: string,
        username: string,
    };

    const logInWithCredentials = async (input: LogInWithCredentialsArgs) => {
        const { username, password } = input;
        return await mutate({
            method: 'CREDENTIALS',
            username,
            password,
        });
    };

    const mutations = {
        logInWithCredentials,
        logInWithFacebook,
        logInWithGoogle,
        logInWithApple,
    };

    return [mutations, result] as [typeof mutations, typeof result]
}