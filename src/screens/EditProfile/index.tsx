// React
import React, { useState, useCallback } from 'react'

// Components
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableScale, PicturePicker } from '@components'
import { View, Text, StyleSheet } from 'react-native'
import TextInput from '../LogIn/TextInput'
import NavBar from './NavBar'

// Helpers
import { useMe, useUpdateProfile } from '@helpers'
import { useNavigation } from '@navigation/utils'

// Constants
import { color, font, ui } from '@constants'

// Types
import { PicturePickerProps } from '@components'


export default function EditProfile() {

    const navigation = useNavigation();

    const [me, meResult] = useMe();

    const [updateProfile, updateProfileResult] = useUpdateProfile();

    // const [form, setForm] = useState(() => ({
    //     firstName: me.firstName,
    //     lastName: me.lastName,
    //     picture: me.picture,
    // }));
    // const [picture, setPicture] = useState(me?.picture.url);
    const [pictureDataUri, setPictureDataUri] = useState<string>();
    const [pictureUri, setPictureUri] = useState(me?.picture?.url);
    // const [biography, setBiography] = useState(me?.biography);
    const [firstName, setFirstName] = useState(me?.firstName);
    const [lastName, setLastName] = useState(me?.lastName);

    const onPictureChanged = useCallback<OnPictureChanged>(
        image => {
            setPictureDataUri(image.data);
            setPictureUri(image.uri);
        },
        []
    );

    const onSubmitPress = async () => {
        try {
            // console.log(`firstName: ${me?.firstName} !== ${firstName}`);
            // console.log(`lastName: ${me?.lastName} !== ${lastName}`);
            // console.log(`pictureDataUri: ${pictureDataUri}`);
            console.log(`data: ${JSON.stringify({
                firstName: selectUpdate(me?.firstName, firstName),
                lastName: selectUpdate(me?.lastName, lastName),
                picture: pictureDataUri,
            }, null, 4)}`);
            await updateProfile({
                firstName: selectUpdate(me?.firstName, firstName),
                lastName: selectUpdate(me?.lastName, lastName),
                picture: pictureDataUri,
            });
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    };

    const disabled = !(
        (me.firstName !== firstName && firstName?.length > 0)
        || (me.lastName !== lastName && lastName?.length > 0)
        || (me.picture?.url !== pictureUri)
    );

    // const disabled = false;

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ backgroundColor: 'white' }}
            keyboardShouldPersistTaps='handled'
            extraHeight={100}
        >
            <NavBar
                onBackPress={navigation.goBack}
            />

            <View style={styles.content}>

                <PicturePicker
                    onChanged={onPictureChanged}
                    uri={pictureUri}
                />

                <View style={{ marginTop: 30 }} />

                <TextInput
                    onChangeText={setFirstName}
                    // onNextPress={onNextPress}
                    value={firstName}
                    // nextRef={lastNameRef}
                    placeholder='Martin'
                    label='Prénom'
                />

                <TextInput
                    onChangeText={setLastName}
                    // onNextPress={onNextPress}
                    value={lastName}
                    // nextRef={nicknameRef}
                    placeholder='Dupont'
                    // ref={lastNameRef}
                    label='Nom'
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
                        Enregistrer
                    </Text>
                </TouchableScale>
            </View>
        </KeyboardAwareScrollView>
    )
}

// Constants
const stringChanged = (l: string, r: string) => (
    (l ?? '') !== (r ?? '') && r?.length > 0
)

const selectUpdate = (l: string, r: string) => (
    stringChanged(l, r) ? r : undefined
)

// Styles
const styles = StyleSheet.create({
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
type OnPictureChanged = PicturePickerProps['onChanged']