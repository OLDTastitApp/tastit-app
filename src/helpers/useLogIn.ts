// Apollo
import { useMutation, useApolloClient } from '@apollo/client'
import * as graph from '@graphql/graph'

// Utils
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { appleAuth } from '@invertase/react-native-apple-authentication'
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
            ['@USER_ID', user.id],
            ['@ROLE', role],
        ]);

        const previous = client.cache.readQuery<
            graph.AuthenticatedResult
        >({ query: graph.AUTHENTICATED });

        const data = update(previous, {
            authenticated: { $set: true },
            userId: { $set: user.id },
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
            console.log(`GOOGLE: before`);
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const token = await GoogleSignin.getTokens();
            const { idToken, accessToken } = token;

            console.log(`GOOGLE: after: ${accessToken}, ${idToken}`);

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
        try {
            console.log(`*** logInWithApple ***`);

            const response = await appleAuth.performRequest({
                requestedScopes: [
                    appleAuth.Scope.EMAIL,
                    appleAuth.Scope.FULL_NAME,
                ],
                requestedOperation: appleAuth.Operation.LOGIN,
            });
    
            console.log(`appleAuthRequestResponse: ${JSON.stringify(response, null, 4)}`);

            const { authorizationCode, identityToken, nonce } = response;

            return await mutate({
                authorizationCode,
                method: 'APPLE',
                identityToken,
                nonce,
            });
            // appleAuthRequestResponse.
    
            // get current authentication state for user
            // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
            const credentialState = await appleAuth
                .getCredentialStateForUser(response.user);
    
            // use credentialState response to ensure the user is authenticated
            if (credentialState === appleAuth.State.AUTHORIZED) {
                // user is authenticated
                // appleAuthRequestResponse.
            }
        } catch (e) {
            console.log(e);
        }
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