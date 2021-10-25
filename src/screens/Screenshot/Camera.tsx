// React
import React, { memo, useState, useRef, useEffect, useCallback } from 'react'

// Components
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, Animated, StatusBar, StyleSheet, Platform, LayoutAnimation } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ImageEditor from '@react-native-community/image-editor'
import Feather from 'react-native-vector-icons/Feather'
import { RNCamera, Constants } from 'react-native-camera'
import ImagePicker from 'react-native-image-crop-picker'
import { TouchableScale } from '@components'

// Utils
import { openSettings, check, request, PERMISSIONS } from 'react-native-permissions'
// import {  } from 'react-native'

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

                const result = await cameraRef?.current?.takePictureAsync({
                    // pauseAfterCapture: true,
                    // base64: true,
                    forceUpOrientation: true,
                    quality: 0.5,
                });

                cameraRef.current?.pausePreview();

                const { uri: pictureUri, width, height } = result;
                console.log(`takePictureAsync: image size: ${result.uri.length * 3 / 4} KB`);
                console.log(`takePictureAsync.result: ${JSON.stringify(result, null, 4)}`);

                console.log(`** thumbnailUri: ${JSON.stringify({
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
                }, null, 4)}`);

                // const thumbnailUri = await ImageEditor.cropImage('https://source.unsplash.com/2Ts5HnA67k8/200x100', {
                const thumbnailUri = await ImageEditor.cropImage(pictureUri, Platform.select({
                    ios: {
                        displaySize: {
                            height: 100 * height / width,
                            width: 100,
                        },
                        offset: { x: 0, y: 0 },
                        size: { width, height },
                    },
                    android: {
                        displaySize: { width, height },
                        size: { width, height },
                        offset: { x: 0, y: 0 },
                    },
                }));

                console.log(`thumbnailUri: ${thumbnailUri}`);

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
        try {
            const result = await ImagePicker.openPicker({
                // compressImageQuality: 0.5,
                mediaType: 'photo',
            });
    
            const pictureUri = result.sourceURL ?? result.path;
            console.log(`onLibraryPress.result: ${JSON.stringify(result, null, 4)}`);
            // console.log(`onLibraryPress: image size: ${result.sourceURL?.length * 3 / 4} KB`)
            const { width, height } = result;
            const thumbnailUri = await ImageEditor.cropImage(pictureUri, Platform.select({
                ios: {
                    displaySize: {
                        height: 100 * height / width,
                        width: 100,
                    },
                    size: { width, height },
                    offset: { x: 0, y: 0 },
                },
                android: {
                    displaySize: { width, height },
                    size: { width, height },
                    offset: { x: 0, y: 0 },
                },
            }));
            props.onCaptured({
                // pictureBase64: `data:image;base64,${result.base64}`,
                // pictureBase64: result.base64,
                // base64: `data:image;base64,${result.base64}`,
                // pictureBase64: result.uri,
                thumbnailUri,
                pictureUri,
            });
            // console.log(JSON.stringify(result, null, 4))
        } catch (e) {
            if (e instanceof Error) {
                if (Platform.OS === 'ios') {
                    const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
                    if (status !== 'granted') {
                        return openSettings();
                    }
                }
            }
        }
    };

    const onRotatePress = () => {
        setCameraType((value: any) => (
            value === RNCamera.Constants.Type.front
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front
        ));
    };

    const [cameraEnabled, setCameraEnalbed] = useState(true);

    useEffect(
        () => {
            (async () => {
                if (Platform.OS === 'ios') {
                    const status = await check(PERMISSIONS.IOS.CAMERA);
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setCameraEnalbed(false);
                    if (status !== 'granted') {
                    }
                }
            })();
        },
        []
    );

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

                    {!cameraEnabled && (
                        <View style={styles.message}>
                            <Text style={styles.description}>
                                Veuillez autoriser l'application à accéder à l'appareil photo depuis vos paramètres
                            </Text>

                            <TouchableScale
                                onPress={openSettings}
                                style={styles.open}
                            >
                                <Text style={styles.settings}>
                                    Paramètres
                                </Text>
                            </TouchableScale>
                        </View>
                    )}

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
    message: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        paddingHorizontal: 30,
        position: 'absolute',
        alignItems: 'center',
    },
    description: {
        fontFamily: 'Avenir Next',
        textAlign: 'center',
        fontWeight: '600',
        color: 'white',
        fontSize: 14,
    },
    open: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 100,
        marginTop: 20,
    },
    settings: {
        fontFamily: 'Avenir Next',
        textAlign: 'center',
        fontWeight: '600',
        color: 'black',
        fontSize: 14,
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