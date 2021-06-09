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
import useLogInWithCredentials from './useLogIn'

// Constants
import { ui, font, color } from '@constants'

// Types
import { Props as FormProps } from './Form'


export default memo(() => {

    const navigation = useNavigation();

    const [logInWithCredentials, logInWithCredentialsResult] = useLogInWithCredentials();

    const onApplePress = () => {
        // ...
    };

    const onFacebookPress = () => {
        // ...
    };

    const onGooglePress = () => {
        // ...
    };

    const onCredentialsPress: OnCredentialsPress = form => {
        logInWithCredentials(form);
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
                    onPress={onApplePress}
                />
                <FacebookSignIn
                    title='Continuer avec Facebook'
                    onPress={onFacebookPress}
                />
                <GoogleSignIn
                    title='Continuer avec Google'
                    onPress={onGooglePress}
                />
            </View>

            {/* <View style={{ flexGrow: 1 }} /> */}

            <Form
                disabled={logInWithCredentialsResult.loading}
                onPrivacyPolicyPress={onPrivacyPolicyPress}
                onSubmitPress={onCredentialsPress}
                onForgotPress={onForgotPress}
                onTOSPress={onTOSPress}
            />

            {/* <View style={{ flexGrow: 1 }} /> */}
        </KeyboardAwareScrollView>
    )
})

// Types
type OnCredentialsPress = FormProps['onSubmitPress']