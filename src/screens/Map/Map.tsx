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
import { Place } from '@types'
// import { Establishment } from './data'

// Data
import { response } from './data'


export default memo((props: Props) => {

    const [loaded, setLoaded] = useState(false);

    // const { initialRegion, focusedPlace } = props;
    const { location, focusedPlace } = props;
    // const { longitude, latitude } = region;

    const initialRegion = {
        longitude: location[0],
        latitude: location[1],
        longitudeDelta: 0.02,
        latitudeDelta: 0.02,
    };

    // const { results } = response;

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

    useEffect(
        () => {
            if (focusedPlace) {
                // ...
                // const [longitude, latitude] = focusedPlace.location;
                const { longitude, latitude } = focusedPlace;
                // mapRef.current.animateCamera({
                //     // longitude,
                //     center: {
                //         longitude,
                //         latitude,
                //     }
                //     // latitude,
                // });
            }
        },
        [focusedPlace]
    );

    useEffect(
        () => {
            if (location) {
                // ...
                // const [longitude, latitude] = focusedPlace.location;
                const [longitude, latitude] = location;
                mapRef.current.animateCamera({
                    center: {
                        longitude,
                        latitude,
                    },
                });
            }
        },
        [location]
    );

    const onPress = useCallback(
        () =>  {

        },
        []
    );

    const onMapReady = useCallback(() => setLoaded(true), []);

    // if (!loaded) return null;

    // console.log(`+Rendering Map component: ${props?.data?.length}`);

    return (
        <>
            <MapView
                onRegionChangeComplete={props.onChanged}
                customMapStyle={themes.silver}
                // customMapStyle={themes.dark}
                initialRegion={initialRegion}
                // provider={PROVIDER_GOOGLE}
                onMapReady={onMapReady}
                // showsMyLocationButton
                style={styles.map}
                // region={region}
                loadingEnabled
                ref={mapRef}
                // liteMode
                cacheEnabled
                // showsTraffic
                // showsIndoorLevelPicker
                // showsBuildings
                showsMyLocationButton
                liteMode
            >
                {props.data?.map((item, index) => (
                    props.renderMarker({
                        item: item.node,
                        focusedPlace,
                        index,
                    })
                ))}
                
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
    renderMarker: (info: RenderMarkerInfo) => JSX.Element,
    onMarkerPress: (item: Place) => void,
    onChanged: (region: Region) => void,
    data?: { node: Place }[],
    // initialRegion: Region,
    focusedPlace?: Place,
    location?: number[],
}

type RenderMarkerInfo = {
    focusedPlace: Place,
    index: number,
    item: Place,
}