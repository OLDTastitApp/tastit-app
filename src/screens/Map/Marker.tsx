// React
import React, { memo, useState, useRef, useEffect } from 'react'

// Components
import { View, Animated, Text, StyleSheet, LayoutAnimation } from 'react-native'
import Icon from '@assets/images/marker.svg'
import Feather from 'react-native-vector-icons/Feather'
import { Marker } from 'react-native-maps'

// Constants
import { color, style } from '@constants'

// Types
import { Place } from '@types'


export default memo((props: Props) => {

    const { item, selected } = props;

    // const { current: scale } = useRef(new Animated.Value(1));
    const scale = selected ? 1.3 : 1;

    // useEffect(
    //     () => {
    //         if (selected) {
    //             Animated.timing(scale, {
    //                 useNativeDriver: true,
    //                 duration: 1000,
    //                 toValue: 1.3,
    //             }).start();
    //         }
    //     },
    //     []
    // );

    const onPress = () => {
        // LayoutAnimation.configureNext(
        //     LayoutAnimation.Presets.spring,
        // );
        props?.onPress?.(item);
    };

    // const size = selected ? 50 : 30;
    const size = 30;

    // const [longitude, latitude] = item.location;
    const { longitude, latitude } = item;

    const coordinate = {
        // longitude: item.geometry.location.lng,
        // latitude: item.geometry.location.lat,
        longitude,
        latitude,
    };

    console.log(`Rendering marker: ${item.name}`)

    const key = `${selected ? 's:' : ''}${props.id}`;

    return (
        <Marker
            tracksInfoWindowChanges={false}
            // tracksInfoWindowChanges={true}
            // tracksViewChanges={selected}
            tracksViewChanges={false}
            coordinate={coordinate}
            onPress={onPress}
            // title={item.name}
            key={key}
        >
            <Animated.View
                style={[
                    styles.container,
                    // selected && {
                    //     transform: [{ scale }],
                    // },
                ]}
            >
                {/* <Feather
                    color='#fa7268'
                    name='map-pin'
                    size={size}
                /> */}
                <Icon
                    height={size}
                    width={size}
                />
                {/* {selected && (
                    <View style={[styles.box, style.shadow]}>
                        <Text style={styles.name}>
                            {item.name}
                        </Text>
                    </View>
                )} */}
            </Animated.View>
        </Marker>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        zIndex: 100,
    },
    box: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginHorizontal: 50,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    name: {
        // marginTop: 5,
        fontSize: 16,
    },
})

// Types
export type Props = {
    onPress: (item: Place) => void,
    selected?: boolean,
    item: Place,
    id: string,
}