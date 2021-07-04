// React
import React, { memo, useCallback, useState } from 'react'

// Components
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Alert } from 'react-native'
import NavBar from './NavBar'
import Form from './Form'

// Helpers
import { useNavigation, useRoute } from '@navigation/utils'
import { useSignUp } from '@helpers'

// Constants
import { ui, font, color } from '@constants'

// Types
import { ApolloError } from '@apollo/client'
import { Props as FormProps } from './Form'


export default memo(function SignUp() {

    const navigation = useNavigation();

    const [existingNickname, setExistingNickname] = useState<string>();
    const [pictureDataUri, setPictureDataUri] = useState<string>();
    const [pictureUri, setPictureUri] = useState<string>();
    const [firstName, setFirstName] = useState<string>('Raphael0');
    const [birthdate, setBirthdate] = useState<Date>(new Date());
    const [nickname, setNickname] = useState<string>('raphael0');
    const [lastName, setLastName] = useState<string>('Hadjadj0');
    const [password, setPassword] = useState<string>('Azerty123');
    const [phone, setPhone] = useState<string>();
    const [email, setEmail] = useState<string>('raphael.hadjadj+0@gmail.com');

    const [signUp, signUpResult] = useSignUp();

    const onSubmitPress = async () => {
        try {
            await signUp({
                picture: pictureDataUri,
                birthdate,
                firstName,
                lastName,
                nickname,
                password,
                email,
                phone,
            });

            navigation.navigate('VerifyEmail', {
                username: email,
                password,
            });
        } catch (e) {
            if (e instanceof ApolloError) {
                if (e.message === 'NICKNAME_ALREADY_EXISTS') {
                    setExistingNickname(nickname);
                } else {
                    Alert.alert('Une erreur est survenue');
                }
            } else {
                Alert.alert('Une erreur est survenue');
            }
        }
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
                onPictureDataUriChanged={setPictureDataUri}
                onPictureUriChanged={setPictureUri}
                existingNickname={existingNickname}
                onFirstNameChanged={setFirstName}
                onBirthdateChanged={setBirthdate}
                onLastNameChanged={setLastName}
                onNicknameChanged={setNickname}
                onPasswordChanged={setPassword}
                pictureDataUri={pictureDataUri}
                onPhoneChanged={setPhone}
                onEmailChanged={setEmail}
                pictureUri={pictureUri}
                birthdate={birthdate}
                firstName={firstName}
                lastName={lastName}
                nickname={nickname}
                password={password}
                email={email}
                phone={phone}
            />
            
        </KeyboardAwareScrollView>
    )
})

// Types
type OnSubmitPress = FormProps['onSubmitPress']