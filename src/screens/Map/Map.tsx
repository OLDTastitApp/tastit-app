// React
import React, { memo, useCallback, useState, useEffect, useRef } from 'react'

// Components
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder'
import { Animated, View, Text, StyleSheet } from 'react-native'
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

    console.log(`+Rendering Map component`);

    return (
        <>
            <MapView
                // onRegionChangeComplete={props.onChanged}
                customMapStyle={themes.silver}
                // customMapStyle={themes.dark}
                initialRegion={initialRegion}
                provider={PROVIDER_GOOGLE}
                onMapReady={onMapReady}
                showsMyLocationButton
                style={styles.map}
                // region={region}
                loadingEnabled
                ref={mapRef}
                // liteMode
            >
                {/* {props.data?.map((item, index) => (
                    props.renderMarker({ item, index, focusedPlace })
                ))} */}
                {/* {results.map((result, i) => (
                    <Marker
                        onPress={props?.onMarkerPress}
                        item={result}
                        id={`${i}`}
                    />
                ))} */}
            </MapView>
        </>
    )
})

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