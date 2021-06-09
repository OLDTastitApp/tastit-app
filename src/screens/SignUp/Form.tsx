// React
import React, { useState, useRef } from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'
import ProfilePicture from './ProfilePicture'
import { TouchableScale } from '@components'
import TextInput from './TextInput'

// Constants
import { color, font } from '@constants'

// Types
import { Ref as TextInputRef, Props as TextInputProps } from './TextInput'


export default ((props: Props) => {

    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [email, setEmail] = useState<string>();

    const passwordRef = useRef<TextInputRef>();
    const lastNameRef = useRef<TextInputRef>();
    const emailRef = useRef<TextInputRef>();

    const onNextPress: OnNextPress = nextRef => {
        nextRef.current?.focus();
    };

    const disabled = !(password?.length > 8)
        || !/\S+@\S+\.\S+/.test(email)
        || !(firstName?.length > 2)
        || !(lastName?.length > 2);

    return (
        <View style={styles.container}>

            <ProfilePicture
                // ...
            />

            <TextInput
                onChangeText={setFirstName}
                onNextPress={onNextPress}
                placeholder='Grégoire'
                nextRef={lastNameRef}
                value={firstName}
                label='Prénom'
            />

            <TextInput
                onChangeText={setLastName}
                onNextPress={onNextPress}
                placeholder='Dupont'
                nextRef={emailRef}
                ref={lastNameRef}
                value={lastName}
                label='Nom'
            />

            <TextInput
                placeholder='gregoire@tastit.com'
                keyboardType='email-address'
                onNextPress={onNextPress}
                onChangeText={setEmail}
                nextRef={passwordRef}
                autoCapitalize='none'
                ref={emailRef}
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

            <View style={{ flex: 1 }} />

            <TouchableScale
                style={[
                    styles.button,
                    disabled && styles.disabled,
                ]}
                // onPress={props.onSignUpPress}
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
        // marginTop: 20,
        flex: 1,
    },
    tos: {
        fontFamily: font.regular,
        color: color.mediumGray,
        textAlign: 'center',
        marginVertical: 10,
        marginBottom: 20,
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
    onSubmitPress: (form: Form) => void,
    onPrivacyPolicyPress: () => void,
    onTOSPress: () => void,
}

type Form = {
    firstName: string,
    lastName: string,
    password: string,
    email: string,
}

type OnNextPress = TextInputProps['onNextPress']