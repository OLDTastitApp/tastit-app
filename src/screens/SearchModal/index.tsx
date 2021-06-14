// React
import React, { RefObject, memo, useState, useCallback, useRef, useMemo, useEffect } from 'react'

// Components
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { ScrollView, Dimensions, View } from 'react-native'
import Animated from 'react-native-reanimated'
import GastronomyView from './GastronomyView'
import DieteticsView from './DieteticsView'
import SectionHeader from './SectionHeader'
import DistrictView from './DistrictView'
import PricingView from './PricingView'
import Footer from './Footer'


export default memo((props: Props) => {

    const { animatedIndex, modalRef } = props;

    const [index, setIndex] = useState(0);
    const [districts, setDistricts] = useState<string[]>([]);

    const scrollViewRef = useRef<ScrollView>(null);

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

    const onPresentModalPress = useCallback(
        () => {
            modalRef.current?.present();
        },
        []
    );

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
            <BottomSheetModal
                onChange={handleSheetChanges}
                animatedIndex={animatedIndex}
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

            {/* <Footer
                animatedIndex={animatedIndex}
                onPress={() => {}}
                disabled={false}
            /> */}
        </>
    )
})

// Constants
const { width } = Dimensions.get('window')
const snapPoints = ['30%', '60%', '90%']

// Types
export type Props = {
    animatedIndex: Animated.SharedValue<number>,
    modalRef: RefObject<BottomSheetModal>,
}