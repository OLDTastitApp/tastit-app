// React
import React, { memo } from 'react'

// Components
import { FacebookSignIn, GoogleSignIn, AppleSignIn } from '@components'
import { useNavigation } from '@navigation/utils'
import { View, Platform } from 'react-native'
import Background from './Background'
import { pictureUris } from './data'
import Footer from './Footer'

// Helpers
import { useLogIn } from '@helpers'


export default memo(() => {

    const navigation = useNavigation();

    const [actions, logInResult] = useLogIn();

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    const onLogInPress = () => {
        navigation.navigate('LogIn');
    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Background
                pictureUris={pictureUris}
                numberOfItems={3}
            />

            <Footer
                onFacebookLogInPress={actions.logInWithFacebook}
                onGoogleLogInPress={actions.logInWithGoogle}
                onAppleLogInPress={actions.logInWithApple}
                onSignUpPress={onSignUpPress}
                onLogInPress={onLogInPress}
            />
        </View>
    )
})