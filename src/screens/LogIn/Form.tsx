// React
import React, { useState, useRef, memo } from 'react'

// Components
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import { TouchableScale, LegalLinks } from '@components'
import TextInput from './TextInput'

// Constants
import { color, font } from '@constants'

// Types
import { Ref as TextInputRef, Props as TextInputProps } from './TextInput'


export default memo((props: Props) => {

    const [password, setPassword] = useState<string>();
    const [email, setEmail] = useState<string>();

    const passwordRef = useRef<TextInputRef>();

    const onNextPress: OnNextPress = nextRef => {
        nextRef.current?.focus();
    };

    const onSubmitPress = () => {
        Keyboard.dismiss();
        props.onSubmitPress({ email, password });
    };

    const disabled = props.disabled
        || !(password?.length > 8)
        || !/\S+@\S+\.\S+/.test(email);

    return (
        <View style={styles.container}>   
            <TextInput
                placeholder='Adresse email'
                keyboardType='email-address'
                onNextPress={onNextPress}
                onChangeText={setEmail}
                nextRef={passwordRef}
                autoCapitalize='none'
                value={email}
                label='Email'
            />

            <TextInput
                onChangeText={setPassword}
                placeholder='Mot de passe'
                label='Mot de passe'
                ref={passwordRef}
                value={password}
                secureTextEntry
            />

            <TouchableScale
                style={[
                    styles.button,
                    disabled && styles.disabled,
                ]}
                onPress={onSubmitPress}
                disabled={disabled}
                activeScale={0.98}
            >
                <Text style={styles.submit}>
                    Se connecter
                </Text>
            </TouchableScale>

            {/* <View style={{
                flexDirection: 'row',
                // backgroundColor: 'red',
                alignItems: 'center',
                marginHorizontal: 10,
                marginVertical: 30,
            }}>
                <View style={styles.line} />
                <Text style={styles.or}>
                    ou
                </Text>
                <View style={styles.line} />
            </View> */}
        
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    line: {
        backgroundColor: color.lightGray,
        height: 1,
        flex: 1,
    },
    or: {
        fontFamily: 'Avenir Next',
        color: color.lightGray,
        marginHorizontal: 20,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18,
    },
    tos: {
        fontFamily: 'Avenir Next',
        color: color.mediumGray,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 20,
        fontSize: 12,
    },
    link: {
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        color: color.gray,
    },
    button: {
        // backgroundColor: color.primary,
        // marginHorizontal: 15,
        // paddingHorizontal: 5,
        // paddingVertical: 10,
        // borderRadius: 100,
        // marginTop: 20,
        backgroundColor: color.primary,
        marginHorizontal: 15,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    disabled: {
        backgroundColor: color.lightGray,
    },
    submit: {
        fontFamily: font.semiBold,
        marginHorizontal: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
    },
})

// Types
export type Props = {
    onForgotPress: (email?: string) => void,
    onSubmitPress: (form: Form) => void,
    onPrivacyPolicyPress: () => void,
    onTOSPress: () => void,
    disabled?: boolean,
}

type Form = {
    password: string,
    email: string,
}

type OnNextPress = TextInputProps['onNextPress']