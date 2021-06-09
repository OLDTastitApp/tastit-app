// React
import React, { memo, useState } from 'react'

// Components
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { PicturePicker } from '@components'
import Section from './Section'
import NavBar from './NavBar'
import Row from './Row'

// Helpers
import { useNavigation, useRoute } from '@navigation/utils'
import useSubmit from './useSubmit'


export default memo(() => {
    
    const { params } = useRoute<'EditProfile'>();
    const navigation = useNavigation();

    const { me } = params;

    const [biography, setBiography] = useState(me.user.biography);
    const [firstName, setFirstName] = useState(me.user.firstName);
    const [lastName, setLastName] = useState(me.user.lastName);
    const [instagram, setInstragram] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [twitter, setTwitter] = useState<string>();
    const [youtube, setYoutube] = useState<string>();
    const [blog, setBlog] = useState<string>();

    const [cover, setCover] = useState<PickedImage>({
        uri: me.user.cover?.value,
    });

    const [submit, submitResult] = useSubmit({
        cover: cover.data,
        user: me.user,
        biography,
        firstName,
        lastName,
    });

    const onBackPress = async () => {
        if (submitResult.canSubmit()) {
            await submit();
        }
        navigation.goBack();
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            style={{ backgroundColor: 'white' }}
            enableResetScrollToCoords={false}
        >
            <NavBar
                disabled={submitResult.loading}
                onBackPress={onBackPress}
                title='Edit profile'
            />

            <PicturePicker
                onChanged={setCover}
                uri={cover.uri}
            />

            <Section title='Profile' />

            <Row
                onChanged={setFirstName}
                placeholder='First name'
                autoCorrect={false}
                label='First name'
                value={firstName}
            />

            <Row
                onChanged={setLastName}
                placeholder='Last name'
                autoCorrect={false}
                label='Last name'
                value={lastName}
            />

            <Row
                onChanged={setUsername}
                placeholder='@username'
                autoCorrect={false}
                label='Username'
                // value={username}
                value='@raphaelhadjadj'
                editable={false}
            />

            <Row
                placeholder='« Welcome ... »'
                onChanged={setBiography}
                value={biography}
                label='Bio'
                multiline
            />

            <Row
                placeholder='https://example.com'
                onChanged={setBlog}
                label='Blog'
                value={blog}
            />

            <Section title='Social accounts' />

            <Row
                onChanged={setInstragram}
                placeholder='Instagram'
                label='Instagram'
                value={instagram}
                editable={false}
            />

            <Row
                onChanged={setTwitter}
                placeholder='Twitter'
                editable={false}
                label='Twitter'
                value={twitter}
            />

            <Row
                onChanged={setYoutube}
                placeholder='Youtube'
                editable={false}
                label='Youtube'
                value={youtube}
            />

        </KeyboardAwareScrollView>
    )
})

type PickedImage = {
    data?: string,
    uri?: string,
}