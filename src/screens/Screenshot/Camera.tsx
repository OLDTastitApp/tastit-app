// React
import React, { memo, useState, useRef, useEffect, useCallback } from 'react'

// Components
import { View, Animated, StatusBar, StyleSheet } from 'react-native'
import ImageEditor from '@react-native-community/image-editor'
import { RNCamera } from 'react-native-camera'
import { TouchableScale } from '@components'

// Constants
import { ui, color } from '@constants'


export default memo((props: Props) => {

    const { onCaptured } = props;

    const cameraRef = useRef<RNCamera>();
    const [locked, setLocked] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { current: opacity } = useRef(new Animated.Value(1));

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

    return (
        <View style={styles.container}>

            <StatusBar barStyle='light-content' />

            {mounted && (
                <>
                    <RNCamera
                        style={StyleSheet.absoluteFill}
                        captureAudio={false}
                        ref={cameraRef}
                        useNativeZoom
                    />

                    <TouchableScale
                        style={styles.button}
                        activeScale={0.96}
                        disabled={locked}
                        onPress={onPress}
                    >

                    </TouchableScale>
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
    button: {
        width: 80,
        height: 80,
        borderColor: 'white',
        borderWidth: 6,
        position: 'absolute',
        bottom: ui.safePaddingBottom + 10,
        alignSelf: 'center',
        backgroundColor: '#ffffff55',
        // backgroundColor: `${color.primary}55`,
        // backgroundColor: '#00000055',
        borderRadius: 80,
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