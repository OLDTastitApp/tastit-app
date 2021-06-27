// React
import React, { memo } from 'react'

// Components
import { View, Text } from 'react-native'
import { TouchableScale, FacebookSignIn, GoogleSignIn, AppleSignIn } from '@components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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

    const onCredentialsPress: OnCredentialsPress = form => {
        const { email: username, password } = form;
        actions.logInWithCredentials({ username, password });
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

            {/* <View style={{ flexGrow: 1 }} /> */}

            <View style={{ alignItems: 'center' }}>
                <AppleSignIn
                    title='Continuer avec Apple'
                    onPress={actions.logInWithApple}
                />
                <FacebookSignIn
                    title='Continuer avec Facebook'
                    onPress={actions.logInWithFacebook}
                />
                <GoogleSignIn
                    title='Continuer avec Google'
                    onPress={actions.logInWithGoogle}
                />
            </View>

            {/* <View style={{ flexGrow: 1 }} /> */}

            <Form
                onPrivacyPolicyPress={onPrivacyPolicyPress}
                onSubmitPress={onCredentialsPress}
                disabled={logInResult.loading}
                onForgotPress={onForgotPress}
                onTOSPress={onTOSPress}
            />

            {/* <View style={{ flexGrow: 1 }} /> */}
        </KeyboardAwareScrollView>
    )
})

// Types
type OnCredentialsPress = FormProps['onSubmitPress']