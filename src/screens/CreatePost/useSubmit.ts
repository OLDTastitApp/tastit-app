// React
import React, { memo, useState, useRef } from 'react'

// Components
import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@navigation/utils'
import { TouchableScale, MessagePopup } from '@components'
import ContentInput from './ContentInput'
import NavBar from './NavBar'
import Footer from './Footer'

// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'

// Constants
import { ui, font, color } from '@constants'

// Types
import { MessagePopupRef } from '@components'


type Args = {
    picture: string,
    message: string,
    place?: string,
}

export default (args: Args) => {

    const navigation = useNavigation();

    const [addPost, addPostResult] = useMutation<
        graph.AddPostResult,
        graph.AddPostArgs
    >(graph.ADD_POST);

    const mutate = async () => {
        
        const { message, picture, place } = args;

        try {
            // console.log(`input: `, JSON.stringify({
            //     // picture: picture.substr(0, 10),
            //     picture,
            //     content: message,
            //     place,
            // }), '---input')
            await addPost({
                refetchQueries: ['Posts', 'MyPosts'],
                variables: {
                    input: {
                        content: message,
                        picture,
                        place,
                    },
                },
            });
        }catch(e) {
            console.log(e)
            throw e;
        }

        // Handle share here
        console.log('Done !');

        navigation.navigate('Home');
    };

    type Result = typeof addPostResult;

    return [mutate, addPostResult] as [typeof mutate, Result];
}