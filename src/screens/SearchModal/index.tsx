// React
import React, { memo, useState, useCallback, useRef, useMemo, useEffect } from 'react'

// Components
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { ScrollView, Dimensions } from 'react-native'
import GastronomyView from './GastronomyView'
import DieteticsView from './DieteticsView'
import SectionHeader from './SectionHeader'
import DistrictView from './DistrictView'
import PricingView from './PricingView'
import Footer from './Footer'

// Helpers
import { useIsFocused } from '@react-navigation/native'
import { useNavigation } from '@navigation/utils'


export default memo((props: Props) => {

    // const focused = useIsFocused();
    // const navigation = useNavigation();

    // const searchRef = useRef<SearchRef>(null);

    const { animatedIndex } = props;

    const [index, setIndex] = useState(0);
    const modalRef = useRef<BottomSheetModal>(null);
    const scrollViewRef = useRef<ScrollView>(null);

    // const animatedPosition = useSharedValue(0);
    // const animatedIndex = useSharedValue(0);

    const [districts, setDistricts] = useState<string[]>([]);
    // const filters = useFilters();

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

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

    const onPresentModalPress = useCallback(() => {
        modalRef.current?.present();
    }, []);

    useEffect(
        () => {
            setTimeout(() => {
                modalRef.current?.present();
            }, 1000)
        },
        []
    );

    return (
        <>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    onChange={handleSheetChanges}
                    animatedIndex={animatedIndex}
                    // enableDismissOnClose={false}
                    snapPoints={snapPoints}
                    handleComponent={null}
                    stackBehavior='push'
                    ref={modalRef}
                    index={0}
                >
                    <SectionHeader
                        onChanged={onIndexChanged}
                        index={index}
                    />

                    <ScrollView
                        scrollEnabled={false}
                        ref={scrollViewRef}
                        horizontal
                    >
                        <DistrictView
                            onChange={setDistricts}
                            selection={districts}
                        />
                        <PricingView />
                        <DieteticsView />
                        <GastronomyView />
                    </ScrollView>

                </BottomSheetModal>
            </BottomSheetModalProvider>

            <Footer
                animatedIndex={animatedIndex}
                onPress={() => {}}
                disabled={false}
            />
        </>
    )
})

// Constants
const { width } = Dimensions.get('window')
const snapPoints = ['30%', '60%', '90%']

// Types
type Props = {
    animatedIndex: Animated.SharedValue<number>,
}