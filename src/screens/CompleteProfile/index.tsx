// React
import React, { memo, useRef, useState, useCallback } from 'react'

// Components
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MessagePopup, TouchableScale, PicturePicker } from '@components'
import { View, Text, Modal, StyleSheet, Alert } from 'react-native'
import TextInput from '../SignUp/TextInput'
import DateInput from '../SignUp/DateInput'
import NavBar from './NavBar'

// Helpers
import { useCompleteProfile } from '@helpers'

// Constants
import { color, ui } from '@constants'

// Types
import { PicturePickerProps } from '@components'
import { MessagePopupRef } from '@components'
import { ApolloError } from '@apollo/client'


export default memo((props: Props) => {

    const { visible } = props;

    const successRef = useRef<MessagePopupRef>(null);

    const [existingNickname, setExistingNickname] = useState<string>();
    const [pictureDataUri, setPictureDataUri] = useState<string>();
    const [existingEmail, setExistingEmail] = useState<string>();
    const [pictureUri, setPictureUri] = useState<string>();
    const [firstName, setFirstName] = useState<string>();
    const [birthdate, setBirthdate] = useState<Date>();
    const [lastName, setLastName] = useState<string>();
    const [nickname, setNickname] = useState<string>();
    const [email, setEmail] = useState<string>();

    const [completeProfile, completeProfileResult] = useCompleteProfile();

    const onSubmitPress = async () => {
        // props.onClose();
        // return;
        try {
            // console.log(`firstName: ${me?.firstName} !== ${firstName}`);
            // console.log(`lastName: ${me?.lastName} !== ${lastName}`);
            // console.log(`pictureDataUri: ${pictureDataUri}`);
            // console.log(`data: ${JSON.stringify({
            //     picture: pictureDataUri,
            //     firstName,
            //     lastName,
            // }, null, 4)}`);
            await completeProfile({
                picture: pictureDataUri,
                birthdate,
                firstName,
                lastName,
                nickname,
                email,
            });
            successRef.current?.show();
        } catch (e) {
            if (e instanceof ApolloError) {
                if (e.message === 'NICKNAME_ALREADY_EXISTS') {
                    setExistingNickname(nickname);
                } else if (e.message === 'EMAIL_ALREADY_EXISTS') {
                    setExistingNickname(email);
                }
                console.log(e)
            } else {
                console.log(e);
                Alert.alert('Une erreur est survenue');
            }
        }
    };

    type OnPictureChanged = PicturePickerProps['onChanged']
    const onPictureChanged = useCallback<OnPictureChanged>(
        image => {
            setPictureDataUri(image.data);
            setPictureUri(image.uri);
        },
        []
    );

    const nicknameError = nickname && existingNickname === nickname
        ? `Ce nom d'utilisateur est déjà utilisé`
        : undefined;

    const emailError = email && existingEmail === email
        ? `Cet email est déjà utilisé`
        : undefined;

    const complete = firstName?.length > 2
        && lastName?.length >= 2
        && nickname?.length >= 2
        && (!(email?.length > 0) || /\S+@\S+\.\S+/.test(email))
        && birthdate;

    return (
        <Modal
            animationType='slide'
            visible={visible}
        >
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ backgroundColor: 'white' }}
                keyboardShouldPersistTaps='handled'
                extraHeight={100}
            >
                <NavBar />

                <View style={styles.content}>

                <PicturePicker
                    onChanged={onPictureChanged}
                    uri={pictureUri}
                />

                <View style={{ marginTop: 30 }} />

                <TextInput
                    onChangeText={setFirstName}
                    placeholder='Martin'
                    value={firstName}
                    label='Prénom'
                />

                <TextInput
                    onChangeText={setLastName}
                    placeholder='Dupont'
                    value={lastName}
                    label='Nom'
                />

                <TextInput
                    onChangeText={setNickname}
                    placeholder='martindupont'
                    error={nicknameError}
                    autoCapitalize='none'
                    label='Utilisateur'
                    value={nickname}
                />

                <TextInput
                    placeholder='gregoire@tastit.com'
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    error={emailError}
                    value={email}
                    label='Email'
                />

                <DateInput
                    title='Date de naissance'
                    placeholder='01/01/2008'
                    onChange={setBirthdate}
                    value={birthdate}
                />

                <View style={{ flex: 1 }} />

                <TouchableScale
                    style={[
                        styles.button,
                        !complete && styles.disabled,
                    ]}
                    onPress={onSubmitPress}
                    disabled={!complete}
                    activeScale={0.99}
                >
                    <Text style={styles.submit}>
                        Enregistrer
                    </Text>
                </TouchableScale>
                </View>
            </KeyboardAwareScrollView>

            <MessagePopup
                message={'Bravo !'}
                ref={successRef}
            />
        </Modal>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        flex: 1,
    },
    content: {
        paddingBottom: ui.safePaddingBottom,
        paddingHorizontal: 20,
        flex: 1,
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
type Props = {
    visible: boolean,
}