// React
import React, { memo, useState, useCallback } from 'react'

// Components
import { View, Text, Image, FlatList, StatusBar, StyleSheet } from 'react-native'
import FilterTumbnail from './FilterThumbnail'
import FilteringPanel from './FilteringPanel'
import ImageView from './ImageView'
import Footer from './Footer'
import Header from './Header'
import Camera from './Camera'

// Utils
import { useNavigation } from '@navigation/utils'
import { filters } from './utils'

// Constants
import { font, color, style } from '@constants'
import { pictureUris } from '@screens/Auth/data'

// Types
import { Props as CameraProps } from './Camera'


export default memo(() => {

    const navigation = useNavigation();

    const [filter, setFilter] = useState<string>();
    const [pictureUri, setPictureUri] = useState<string>();
    const [capture, setCapture] = useState<Parameters<OnCaptured>[0]>();
    // const imageUri = 'https://picturepan2.github.io/instagram.css/assets/img/instagram.jpg';

    const onFilterChanged = useCallback(
        (filter: string) => setFilter(filter),
        []
    );

    const onNextPress = () => {
        navigation.navigate('CreatePost', {
            pictureBase64: capture.pictureBase64,
            pictureUri: capture.pictureUri,
            filter,
        });
    };

    const onCaptured = useCallback<OnCaptured>(
        capture => {
            // setPictureUri(base64);
            // setPictureUri(capture.thumbnailUri);
            setCapture(capture);
        },
        []
    );

    const onRetakePress = useCallback(
        // () => setPictureUri(undefined),
        () => setCapture(undefined),
        []
    );

    return (
        <View style={style.flex}>

            {/* {!pictureUri ? ( */}
            {!capture ? (
                <Camera
                    onCaptured={onCaptured}
                />
            ) : (
                <ImageView
                    imageUri={capture.pictureUri}
                    filter={filter}
                />
            )}
            
            <FilteringPanel
                onRetakePress={onRetakePress}
                onChanged={onFilterChanged}
                onSubmit={onNextPress}
                // visible={!!pictureUri}
                visible={!!capture}
                // uri={pictureUri}
                uri={capture?.thumbnailUri}
                filter={filter}
            />

            <Header onBackPress={navigation.goBack} />
        </View>
    )
})

// Types
type OnCaptured = CameraProps['onCaptured']