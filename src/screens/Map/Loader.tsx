// React
import React, { memo, useCallback, useState, useEffect, useRef } from 'react'

// Components
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder'
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native'
import Marker from './Marker'

// Constants
import { font, color } from '@constants'
import * as themes from './themes'

// Types
import { Establishment } from '@types'
// import { Establishment } from './data'

// Data
import { response } from './data'


export default memo((props: Props) => {

    const [loaded, setLoaded] = useState(false);

    const { initialRegion, /*focusedPlace*/ } = props;
    // const { longitude, latitude } = region;

    const { results } = response;

    const mapRef = useRef<MapView>();

    const [visible, setVisible] = useState(true);
    const { current: progress } = useRef(new Animated.Value(1));

    useEffect(
        () => {
            if (!loaded) {
                setVisible(true);
            }
            Animated.timing(progress, {
                useNativeDriver: true,
                toValue: +!loaded,
                delay: 2000,
                duration: 250,
            }).start(() => {
                if (loaded) {
                    setVisible(false);
                }
            });
        },
        [loaded]
    );

    // useEffect(
    //     () => {
    //         const timeoutId = setTimeout(() => setLoaded(true), 1000);
    //         return () => {
    //             console.log('UNMOUNTED');
    //             setLoaded(false);
    //             clearTimeout(timeoutId);
    //         }
    //     },
    //     []
    // );

    // useEffect(
    //     () => {
    //         if (focusedPlace) {
    //             // ...
    //             const [longitude, latitude] = focusedPlace.location;
    //             mapRef.current.animateCamera({
    //                 // longitude,
    //                 center: {
    //                     longitude,
    //                     latitude,
    //                 }
    //                 // latitude,
    //             });
    //         }
    //     },
    //     [focusedPlace]
    // );

    const onPress = useCallback(
        () =>  {

        },
        []
    );

    const onMapReady = useCallback(() => setLoaded(true), []);

    // if (!loaded) return null;

    // console.log(`+Rendering Map component`);

    return (
        <>
            

            {visible && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        { opacity: progress },
                    ]}
                >
                    <Placeholder Animation={Fade}>
                        <PlaceholderMedia
                            style={{
                                height,
                                width,
                            }}
                            color='#aaa'
                        />
                    </Placeholder>
                </Animated.View>
            )}
        </>
    )
})

// Constants
const { width, height } = Dimensions.get('window')

// Styles
const styles = StyleSheet.create({
    container: {
        // ...
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})

// Types
export type Props = {
    // renderMarker: (info: RenderMarkerInfo) => JSX.Element,
    // onMarkerPress: (item: Establishment) => void,
    // onChanged: (region: Region) => void,
    // focusedPlace?: Establishment,
    // data?: Establishment[],
    initialRegion: Region,
}

type RenderMarkerInfo = {
    focusedPlace: Establishment,
    item: Establishment,
    index: number,
}