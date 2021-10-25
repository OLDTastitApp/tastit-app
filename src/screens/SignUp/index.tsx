// React
import React, { memo, useCallback, useState, useRef } from 'react'

// Components
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text, Alert } from 'react-native'
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
    const [firstName, setFirstName] = useState<string>();
    const [birthdate, setBirthdate] = useState<Date>();
    const [nickname, setNickname] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [email, setEmail] = useState<string>();

    const [signUp, signUpResult] = useSignUp();

    const loadingRef = useRef(false);

    const onSubmitPress = async () => {
        if (loadingRef.current) return;
        loadingRef.current = true;

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
                } else if (e.message === 'USER_ALREADY_EXISTS') {
                    Alert.alert('Un compte avec cet email existe déjà. Essayez plutôt de vous connecter.');
                } else {
                    console.log(e);
                    Alert.alert('Une erreur est survenue');
                }
            } else {
                console.log(e);
                Alert.alert('Une erreur est survenue');
            }
        } finally {
            loadingRef.current = false;
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

            {/* <Text style={{
                marginHorizontal: 20,
                fontFamily: 'Avenir Next',
                // marginTop: 10,
                fontSize: 28,
                color: color.dark,
                fontWeight: 'bold',
                marginBottom: 20,
            }}>
                Connexion
            </Text> */}

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