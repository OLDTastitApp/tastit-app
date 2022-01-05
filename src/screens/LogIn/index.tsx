// React
import React, { memo } from 'react'

// Components
import { LegalLinks, FacebookSignIn, GoogleSignIn, AppleSignIn } from '@components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Text, Platform } from 'react-native'
import { useNavigation } from '@navigation/utils'
import NavBar from './NavBar'
import Form from './Form'

// Helpers
// import useLogInWithCredentials from './useLogIn'
import { useLogIn } from '@helpers'

// Constants
import { ui, font, color } from '@constants'

// Types
import { Props as FormProps } from './Form'


export default memo(() => {

    const navigation = useNavigation();

    const [actions, logInResult] = useLogIn();

    const onCredentialsPress: OnCredentialsPress = async form => {
        try {
            const { email: username, password } = form;
            await actions.logInWithCredentials({ username, password });
        } catch (e) {
            console.log(e);
        }
    };

    const onForgotPress = () => {
        // ...
    };

    const onPrivacyPolicyPress = () => {
        // ...
    };

    const onTOSPress = () => {
        // ...
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ backgroundColor: 'white' }}
            keyboardShouldPersistTaps='handled'
            extraHeight={100}
        >
            <NavBar
                onBackPress={navigation.goBack}
                title={`Connexion`}
            />

            <Text style={{
                marginHorizontal: 20,
                fontFamily: 'Avenir Next',
                marginTop: 10,
                fontSize: 28,
                color: color.dark,
                fontWeight: 'bold',
            }}>
                Connexion
            </Text>

            {/* <View style={{ flexGrow: 1 }} /> */}

            

            {/* <View style={{ flexGrow: 1 }} /> */}

            <Form
                onPrivacyPolicyPress={onPrivacyPolicyPress}
                onSubmitPress={onCredentialsPress}
                disabled={logInResult.loading}
                onForgotPress={onForgotPress}
                onTOSPress={onTOSPress}
            />

            {/* <View style={{ alignItems: 'center' }}>
                {Platform.OS === 'ios' && (
                    <AppleSignIn
                        title='Continuer avec Apple'
                        onPress={actions.logInWithApple}
                    />
                )}
                <FacebookSignIn
                    title='Continuer avec Facebook'
                    onPress={actions.logInWithFacebook}
                />
                <GoogleSignIn
                    title='Continuer avec Google'
                    onPress={actions.logInWithGoogle}
                />
            </View> */}

            <LegalLinks
                style={{ marginHorizontal: 30 }}
                onPrivacyPolicyPress={() => {}}
                onTOSPress={() => {}}
            />

            {/* <View style={{ flexGrow: 1 }} /> */}
        </KeyboardAwareScrollView>
    )
})

// Types
type OnCredentialsPress = FormProps['onSubmitPress']