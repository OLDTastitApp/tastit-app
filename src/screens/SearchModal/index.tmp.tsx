// React
import React, { memo, useState, useCallback, useRef, useMemo, useEffect } from 'react'

// Components
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import Animated, { useCode, call, interpolate, interpolateNode, useValue, useSharedValue, Extrapolate } from 'react-native-reanimated'
import BottomSheet, { BottomSheetModal} from '@gorhom/bottom-sheet'
import GastronomyView from './GastronomyView'
import DieteticsView from './DieteticsView'
import DistrictView from './DistrictView'
import PricingView from './PricingView'
import Header from './Header'

// Helpers
import { useIsFocused } from '@react-navigation/native'
import { useNavigation } from '@navigation/utils'

// Constants
import { ui, font, color, style } from '@constants'

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

    const animatedPosition = useSharedValue(0);
    const animatedIndex = useSharedValue(0);
    // const position = useValue(0);
    // const { current: position } = useRef(new Animated.Value(0));

    const snapPoints = useMemo(() => [100, 200, 500], []);
    // const position = useValue(0);
    const translateY = useMemo(() => interpolateNode(animatedPosition.value, {
        inputRange: [0, 200],
        outputRange: [0, 200],
        // extrapolate: Extrapolate.CLAMP,
    }), [snapPoints]);
    
    // const translateY = useMemo(
    //     () => interpolateNode(animatedIndex.value, {
    //         // extrapolate: Extrapolate.CLAMP,
    //         inputRange: [0, 1],
    //         // outputRange: [200, 0],
    //         outputRange: [0, 100],
    //     }),
    //     []
    // );

    // useCode(
    //     () => {
    //         return call([animatedIndex], (circleRadius) => {
    //             console.log('1111', circleRadius)
    //         })
    //     },
    //     []
    // )

    // const translateY = position.interpolate({
    //     extrapolate: Extrapolate.CLAMP,
    //     // inputRange: [0, 1],
    //     // outputRange: [200, 0],
    //     inputRange: [0, 200],
    //     outputRange: [0, 200],
    // });
    // const translateY = interpolateNode(position, {
    //     // extrapolate: Extrapolate.CLAMP,
    //     // inputRange: [0, 1],
    //     // outputRange: [200, 0],
    //     inputRange: [0, 200],
    //     outputRange: [0, 200],
    // })

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

    // const snapPoints = [0, '30%', '60%', '90%']

    return (
        <>
            <BottomSheet
                onChange={handleSheetChanges}
                animatedPosition={animatedPosition}
                animatedIndex={animatedIndex}
                // animatedPosition={position}
                // animatedPosition={position}
                style={styles.container}
                snapPoints={snapPoints}
                handleComponent={null}
                // ref={bottomSheetRef}
                // index={1}
                // enableOverDrag={false}
                index={1}
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
                    // paddingBottom: ui.safePaddingBottom,
                    marginBottom: ui.safePaddingBottom,
                    backgroundColor: 'purple',
                    position: 'absolute',
                    width: '100%',
                    // paddingHorizontal: 20,
                    // flex: 1,
                    // padding
                    bottom: 0,
                    transform: [{ translateY }],
                }}
            >
                <View style={{
                    backgroundColor: 'purple',
                    marginHorizontal: 20,
                    // margin
                    // paddingHorizontal: 5,
                    padding: 5,
                    borderRadius: 14,
                }}>
                    <View style={{
                        // backgroundColor: color.primary,
                        // marginHorizontal: 20,
                        // marginVertical: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderRadius: 14,
                        // marginTop: 20,
                    }}>
                        <Text style={{
                            fontFamily: 'Avenir Next',
                            color: 'white',
                            fontSize: 16,
                            fontWeight: '500',
                        }}>
                            Rechercher
                        </Text>
                    </View>
                </View>
            </Animated.View>
        </>
    )
})

// Constants
const { width } = Dimensions.get('window')
// const snapPoints = [0, '30%', '60%', '90%']

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