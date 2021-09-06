// React
import React, { memo, useState, useRef, useEffect, useCallback } from 'react'

// Components
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View, Image, Animated, StatusBar, StyleSheet } from 'react-native'
import ImageEditor from '@react-native-community/image-editor'
import Feather from 'react-native-vector-icons/Feather'
import { RNCamera, Constants } from 'react-native-camera'
import ImagePicker from 'react-native-image-crop-picker'
import { TouchableScale } from '@components'

// Constants
import { ui, color } from '@constants'

const cameraTypes = [
    RNCamera.Constants.Type.front,
    RNCamera.Constants.Type.back,
]

export default memo((props: Props) => {

    const { onCaptured } = props;

    const cameraRef = useRef<RNCamera>();
    const [locked, setLocked] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { current: opacity } = useRef(new Animated.Value(1));
    const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);

    useEffect(
        () => { setTimeout(() => setMounted(true), 250); },
        []
    );

    useEffect(
        () => {
            Animated.timing(opacity, {
                useNativeDriver: true,
                toValue: +!mounted,
                duration: 1000,
            }).start();
        },
        [mounted]
    );

    const onPress = useCallback(
        async () => {
            try {
                setLocked(true);
                cameraRef.current?.pausePreview();

                const result = await cameraRef?.current?.takePictureAsync({
                    // pauseAfterCapture: true,
                    // base64: true,
                    quality: 0.5,
                });

                const { uri: pictureUri, width, height } = result;
                console.log(`takePictureAsync: image size: ${result.uri.length * 3 / 4} KB`)

                const thumbnailUri = await ImageEditor.cropImage(pictureUri, {
                    displaySize: {
                        height: 100 * height / width,
                        width: 100,
                    },
                    offset: { x: 0, y: 0 },
                    size: {
                        width, height,
                        // height: 280 * height / width,
                        // width: 280,
                    },
                });

                // console.log(result.base64)

                props.onCaptured({
                    // pictureBase64: `data:image;base64,${result.base64}`,
                    pictureBase64: result.base64,
                    // base64: `data:image;base64,${result.base64}`,
                    // pictureBase64: result.uri,
                    thumbnailUri,
                    pictureUri,
                });

            } finally {
                // cameraRef.current?.resumePreview();
                // setLocked(false);
            }
        },
        []
    );

    const onLibraryPress = async () => {
        const result = await ImagePicker.openPicker({
            // compressImageQuality: 0.5,
            compressImageQuality: 0.1,
            mediaType: 'photo',
        });
        console.log(`onLibraryPress: image size: ${result.sourceURL.length * 3 / 4} KB`)
        const { width, height, sourceURL: pictureUri } = result;
        const thumbnailUri = await ImageEditor.cropImage(pictureUri, {
            displaySize: {
                height: 100 * height / width,
                width: 100,
            },
            size: { width, height },
            offset: { x: 0, y: 0 },
        });
        props.onCaptured({
            // pictureBase64: `data:image;base64,${result.base64}`,
            // pictureBase64: result.base64,
            // base64: `data:image;base64,${result.base64}`,
            // pictureBase64: result.uri,
            thumbnailUri,
            pictureUri,
        });
        // console.log(JSON.stringify(result, null, 4))
    };

    const onRotatePress = () => {
        setCameraType((value: any) => (
            value === RNCamera.Constants.Type.front
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front
        ));
    };

    return (
        <View style={styles.container}>

            <StatusBar barStyle='light-content' />

            {mounted && (
                <>
                    <RNCamera
                        style={StyleSheet.absoluteFill}
                        captureAudio={false}
                        type={cameraType}
                        ref={cameraRef}
                        useNativeZoom
                    />
                    {/* <Image
                        style={StyleSheet.absoluteFill}
                        source={{ uri: pictureUri }}
                    /> */}

                    <View style={styles.footer}>

                        <TouchableScale
                            onPress={onLibraryPress}
                            style={styles.action}
                            activeScale={0.98}
                        >
                            <Feather
                                color={color.dark}
                                name='image'
                                size={28}
                            />
                        </TouchableScale>

                        <TouchableScale
                            style={styles.button}
                            activeScale={0.96}
                            disabled={locked}
                            onPress={onPress}
                        />

                        <TouchableScale
                            onPress={onRotatePress}
                            style={styles.action}
                            activeScale={0.98}
                        >
                            <MaterialIcons
                                name='flip-camera-android'
                                color={color.dark}
                                size={30}
                            />
                        </TouchableScale>
                    </View>
                </>
            )}

            <Animated.View
                pointerEvents='none'
                style={[
                    StyleSheet.absoluteFill,
                    styles.overlay,
                    { opacity },
                ]}
            />

        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'black',
        flex: 1,
    },
    overlay: {
        backgroundColor: 'black',
    },
    footer: {
        // alignSelf: 'center',
        bottom: ui.safePaddingBottom + 10,
        // justifyContent: 'space-between',
        // justifyContent: 'space-around',
        justifyContent: 'space-evenly',
        // justifyContent: 'center',
        // backgroundColor: 'purple',
        alignItems: 'center',
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        // paddingHorizontal: 20,
        // height: '100%',
        // top: 0,
    },
    button: {
        width: 80,
        height: 80,
        borderColor: 'white',
        borderWidth: 6,
        backgroundColor: '#ffffff55',
        borderRadius: 80,
    },
    action: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#fffa',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

// Types
export type Props = {
    onCaptured: (args: CaptureArgs) => void,
}

export type CaptureArgs = {
    thumbnailBase64?: string,
    pictureBase64?: string,
    thumbnailUri?: string,
    pictureUri?: string,
}

//#region 
const pictureUri = 'https://images.pexels.com/photos/4236824/pexels-photo-4236824.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
//#endregion