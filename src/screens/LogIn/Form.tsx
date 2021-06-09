// React
import React, { useState, useRef, memo } from 'react'

// Components
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import { TouchableScale } from '@components'
import TextInput from './TextInput'

// Constants
import { color, font } from '@constants'

// Types
import { Ref as TextInputRef, Props as TextInputProps } from './TextInput'


export default memo((props: Props) => {

    const [password, setPassword] = useState<string>('Azerty123');
    const [email, setEmail] = useState<string>('raphael.hadjadj@gmail.com');

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
        <View
            style={styles.container}
        >
            <Text style={styles.or}>
                ou
            </Text>
            
            <TextInput
                placeholder='gregoire@tastit.com'
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

            <Text style={styles.tos}>
                En continuant, vous acceptez les {''}
                <Text
                    onPress={props.onTOSPress}
                    style={styles.link}
                >
                    Conditions d'utilisation
                </Text>
                {''} et {''}
                <Text
                    onPress={props.onPrivacyPolicyPress}
                    style={styles.link}
                >
                    Politique de confidentialité
                </Text>
                {''} de Tastit
            </Text>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    or: {
        fontFamily: font.regular,
        color: color.darkGray,
        marginHorizontal: 20,
        textAlign: 'center',
        fontSize: 18,
    },
    tos: {
        fontFamily: font.regular,
        color: color.mediumGray,
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 12,
    },
    link: {
        fontFamily: font.extraBold,
    },
    button: {
        backgroundColor: color.primary,
        marginHorizontal: 15,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 100,
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