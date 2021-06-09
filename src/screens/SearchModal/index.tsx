// React
import React, { memo, useState, useCallback, useRef, useMemo, useEffect } from 'react'

// Components
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import Animated, { useValue, Extrapolate } from 'react-native-reanimated'
import BottomSheet from '@gorhom/bottom-sheet'
import GastronomyView from './GastronomyView'
import DieteticsView from './DieteticsView'
import DistrictView from './DistrictView'
import PricingView from './PricingView'
import Header from './Header'

// Helpers
import { useIsFocused } from '@react-navigation/native'
import { useNavigation } from '@navigation/utils'

// Constants
import { font, color, style } from '@constants'

// Types
// import { Ref as SearchRef, Props as SearchProps } from '../Search'
import { District, Establishment } from '@types'


export default memo((props: Props) => {

    const focused = useIsFocused();
    const navigation = useNavigation();

    // const searchRef = useRef<SearchRef>(null);

    const [index, setIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const currentPosition = useValue(0);
    const translateY = useMemo(
        () => currentPosition.interpolate({
            extrapolate: Extrapolate.CLAMP,
            inputRange: [100, 300],
            outputRange: [0, 200],
        }),
        []
    );

    const [districtSelection, setDistrictSelection] = useState<District[]>([]);

    // const filters = useFilters();


    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // const animationConfigs = useBottomSheetTimingConfigs({
    //     duration: 250,
    //     easing: Easing.exp,
    // });

    const onIndexChanged = useCallback(
        (index: number) => {
            setIndex(index);
            scrollViewRef.current?.scrollTo({
                x: index * width,
                animated: false,
            });
        },
        []
    );

    return (
        <>
            <BottomSheet
                onChange={handleSheetChanges}
                style={styles.container}
                snapPoints={snapPoints}
                handleComponent={null}
                ref={bottomSheetRef}
            >
                <Header
                    onChanged={onIndexChanged}
                    index={index}
                />

                <ScrollView
                    scrollEnabled={false}
                    ref={scrollViewRef}
                    horizontal
                >
                    <DistrictView />
                    <PricingView />
                    <DieteticsView />
                    <GastronomyView />
                </ScrollView>

            </BottomSheet>

            <Animated.View
                style={{
                    // padding
                }}
            >
                <Text>
                    RECHERCHER
                </Text>
            </Animated.View>
        </>
    )
})

// Constants
const { width } = Dimensions.get('window')
const snapPoints = ['30%', '60%', '90%']

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOpacity: 0.48,
        shadowRadius: 16.00,
        // paddingTop: 20,
        elevation: 24,
        shadowOffset: {
            height: 12,
            width: 0,
        },
    },
})

// Types
type Props = {
    // ...
}