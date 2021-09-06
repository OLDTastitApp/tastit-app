// React
import React, { useState, useRef, useCallback } from 'react'

// Components
import { TouchableScale, PicturePicker } from '@components'
import { View, Text, StyleSheet } from 'react-native'
import DateInput from './DateInput'
import TextInput from './TextInput'
// import TextInput from '../LogIn/TextInput'

// Constants
import { color, font, ui } from '@constants'

// Types
import { Ref as TextInputRef, Props as TextInputProps } from './TextInput'
import { PicturePickerProps } from '@components'


export default ((props: Props) => {

    // const [existingNickname, setexistingNickname] = useState<string>();
    // const [pictureDataUri, setPictureDataUri] = useState<string>();
    // const [pictureUri, setPictureUri] = useState<string>();
    // const [firstName, setFirstName] = useState<string>('Raphael0');
    // const [birthdate, setBirthdate] = useState<Date>(new Date());
    // const [nickname, setNickname] = useState<string>('raphael0');
    // const [lastName, setLastName] = useState<string>('Hadjadj0');
    // const [password, setPassword] = useState<string>('Azerty123');
    // const [phone, setPhone] = useState<string>();
    // const [email, setEmail] = useState<string>('raphael.hadjadj+0@gmail.com');

    const nicknameRef = useRef<TextInputRef>();
    const passwordRef = useRef<TextInputRef>();
    const lastNameRef = useRef<TextInputRef>();
    const phoneRef = useRef<TextInputRef>();
    const emailRef = useRef<TextInputRef>();

    const onNextPress: OnNextPress = nextRef => {
        nextRef.current?.focus();
    };

    const onPictureChanged = useCallback<OnPictureChanged>(
        image => {
            props.onPictureDataUriChanged(image.data);
            props.onPictureUriChanged(image.uri);
        },
        []
    );

    const onSubmitPress = () => {
        props.onSubmitPress();
        // props.onSubmitPress({
        //     picture: pictureDataUri,
        //     firstName,
        //     birthdate,
        //     nickname,
        //     lastName,
        //     password,
        //     phone,
        //     email,
        // });
    };

    const nicknameError = props.nickname && props.existingNickname === props.nickname
        ? `Ce nom d'utilisateur est déjà utilisé`
        : undefined;

    const disabled = !(props.password?.length > 8)
        // || !(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gmi).test(phone)
        || !/\S+@\S+\.\S+/.test(props.email)
        || !(props.firstName?.length > 2)
        || !(props.lastName?.length > 2)
        || !(props.nickname?.length > 2)
        || props.birthdate == null;

    return (
        <View style={styles.container}>

            <PicturePicker
                onChanged={onPictureChanged}
                uri={props.pictureUri}
            />

            <View style={{ marginTop: 30 }} />

            <TextInput
                onChangeText={props.onFirstNameChanged}
                onNextPress={onNextPress}
                value={props.firstName}
                nextRef={lastNameRef}
                placeholder='Martin'
                label='Prénom'
            />

            <TextInput
                onChangeText={props.onLastNameChanged}
                onNextPress={onNextPress}
                value={props.lastName}
                nextRef={nicknameRef}
                placeholder='Dupont'
                ref={lastNameRef}
                label='Nom'
            />

            <TextInput
                // error={`Ce nom d'utilisateur est déjà utilisé`}
                onChangeText={props.onNicknameChanged}
                placeholder='martindupont'
                onNextPress={onNextPress}
                value={props.nickname}
                error={nicknameError}
                autoCapitalize='none'
                label='Utilisateur'
                // nextRef={phoneRef}
                nextRef={emailRef}
                ref={nicknameRef}
            />

            {/* <TextInput
                onNextPress={onNextPress}
                keyboardType='phone-pad'
                placeholder='0612345678'
                onChangeText={setPhone}
                nextRef={emailRef}
                ref={phoneRef}
                value={phone}
                label='Numéro'
            /> */}

            <TextInput
                onChangeText={props.onEmailChanged}
                placeholder='gregoire@tastit.com'
                keyboardType='email-address'
                onNextPress={onNextPress}
                nextRef={passwordRef}
                autoCapitalize='none'
                value={props.email}
                ref={emailRef}
                label='Email'
            />

            <TextInput
                onChangeText={props.onPasswordChanged}
                placeholder='Mot de passe'
                value={props.password}
                label='Mot de passe'
                ref={passwordRef}
                secureTextEntry
            />

            <DateInput
                onChange={props.onBirthdateChanged}
                title='Date de naissance'
                placeholder='01/01/2008'
                value={props.birthdate}
            />

            <View style={{ flex: 1 }} />

            <TouchableScale
                style={[
                    styles.button,
                    disabled && styles.disabled,
                ]}
                onPress={onSubmitPress}
                disabled={disabled}
                activeScale={0.99}
            >
                <Text style={styles.submit}>
                    S'inscrire
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
        paddingBottom: ui.safePaddingBottom,
        paddingHorizontal: 20,
        flex: 1,
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
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
        textAlign: 'center',
        fontWeight: '600',
        color: 'white',
        fontSize: 22,
    },
})

// Types
export type Props = {
    onPrivacyPolicyPress: () => void,
    onSubmitPress: () => void,
    onTOSPress: () => void,
    onPictureDataUriChanged: (value: string) => void,
    onPictureUriChanged: (value: string) => void,
    onFirstNameChanged: (value: string) => void,
    onNicknameChanged: (value: string) => void,
    onLastNameChanged: (value: string) => void,
    onPasswordChanged: (value: string) => void,
    onBirthdateChanged: (value: Date) => void,
    onPhoneChanged: (value: string) => void,
    onEmailChanged: (value: string) => void,
    existingNickname?: string,
    pictureDataUri?: string,
    pictureUri?: string,
    firstName: string,
    nickname: string,
    lastName: string,
    password: string,
    birthdate: Date,
    phone?: string,
    email: string,
}

type OnNextPress = TextInputProps['onNextPress']

type OnPictureChanged = PicturePickerProps['onChanged']