// React
import React, { memo, useState, useRef } from 'react'

// Components
import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@navigation/utils'
import { TouchableScale, MessagePopup } from '@components'
import ContentInput from './ContentInput'
import Section from './Section'
import NavBar from './NavBar'
import Footer from './Footer'
import Share from './Share'
import Row from './Row'

// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'

// Helpers
import useSubmit from './useSubmit'

// Constants
import { ui, font, color } from '@constants'

// Types
import { MessagePopupRef } from '@components'
import { Establishment, User } from '@types'


export default memo(() => {

    const navigation = useNavigation();
    const route = useRoute<'CreatePost'>();

    const popupRef = useRef<MessagePopupRef>();
    const [message, setMessage] = useState<string>();
    const [service, setService] = useState<string>();

    const [pictureBase64, setPictureBase64] = useState<string>();

    // const { pictureUri, pictureBase64 } = route.params;
    const { pictureUri, filter } = route.params;

    // console.log(`pictureBase64: ${pictureBase64.substr(0, 100)}`)

    // @TODO: rename setPlace
    const [place, setEstablishment] = useState<Establishment>();
    const [friends, setFriends] = useState<User[]>([]);

    const [submit, submitResult] = useSubmit({
        picture: pictureBase64,
        place: place?.id,
        message,
    });

    const onAddLocationPress = () => {
        navigation.navigate(
            'SelectEstablishment',
            { setEstablishment }
        );
    };

    const onTagFriendsPress = () => {
        navigation.navigate(
            'SelectFriends',
            { setFriends }
        );
    };

    const disabled = !(
        pictureBase64
        && message?.length > 0
        && place
    );

    return (
        <>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
                keyboardShouldPersistTaps='handled'
                keyboardDismissMode='none'
                scrollEnabled={false}
            >
                <NavBar
                    onBackPress={navigation.goBack}
                    barStyle='dark-content'
                />

                <ContentInput
                    onPictureBase64Extracted={setPictureBase64}
                    pictureUri={pictureUri}
                    onChange={setMessage}
                    value={message}
                    filter={filter}
                />

                <Section />

                <Row
                    onPress={onAddLocationPress}
                    title='Ajouter un lieu'
                    value={place?.name}
                />

                <Row
                    onPress={onTagFriendsPress}
                    title='Tagger des amis'
                />

                <Section title='Partager' />

                <Share onShareChanged={setService} />

                <Footer
                    disabled={disabled || submitResult.loading}
                    onSubmit={submit}
                />

            </ScrollView>

            {/* <MessagePopup
                message='Publié !'
                ref={popupRef}
            /> */}
        </>
    )
})