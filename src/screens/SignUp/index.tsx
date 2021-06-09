// React
import React, { memo, useState, useRef } from 'react'

// Components
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FacebookSignIn, GoogleSignIn, AppleSignIn } from '@components'
import { useNavigation } from '@navigation/utils'
import { View } from 'react-native'
import TextInput from './TextInput'
import NavBar from './NavBar'
import Form from './Form'

// Constants
import { ui, font, color } from '@constants'

// Types
import { Ref as TextInputRef, Props as TextInputProps } from './TextInput'


export default memo(() => {

    const onNextPress: OnNextPress = nextRef => {
        nextRef.current?.focus();
    };

    const navigation = useNavigation();

    const onSubmitPress = () => {
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
                title={`Inscription`}
            />

            <Form
                onPrivacyPolicyPress={onPrivacyPolicyPress}
                onSubmitPress={onSubmitPress}
                onTOSPress={onTOSPress}
            />
            
        </KeyboardAwareScrollView>
    )
})

// Types
type OnNextPress = TextInputProps['onNextPress']