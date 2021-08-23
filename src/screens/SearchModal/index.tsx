// React
import React, { RefObject, memo, useState, useCallback, useRef, useMemo, useEffect } from 'react'

// Components
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { ScrollView, Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import GastronomyView from './GastronomyView'
import DieteticsView from './DieteticsView'
import SectionHeader from './SectionHeader'
import DistrictView from './DistrictView'
import PricingView from './PricingView'

// Types
import { Pricing } from '@types'


export default memo((props: Props) => {

    const { animatedIndex, modalRef } = props;

    const [index, setIndex] = useState(0);
    // const [pricing, setPricing] = useState<Pricing>();
    // const [districts, setDistricts] = useState<string[]>([]);
    // const [dietetics, setDietetics] = useState<string[]>([]);
    // const [gastronomies, setGastronomies] = useState<string[]>([]);

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
            modalRef.current?.snapToIndex(1);
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

    // console.log(`districts: ${JSON.stringify(props.districts, null, 4)}`)

    return (
        <>
            <BottomSheetModal
                onChange={handleSheetChanges}
                animatedIndex={animatedIndex}
                enableDismissOnClose={false}
                enablePanDownToClose={false}
                snapPoints={snapPoints}
                handleComponent={null}
                stackBehavior='push'
                ref={modalRef}
                index={0}
            >
                <SectionHeader
                    onPress={onPresentModalPress}
                    onChanged={onIndexChanged}
                    index={index}
                />

                <ScrollView
                    scrollEnabled={false}
                    ref={scrollViewRef}
                    horizontal
                >
                    <DistrictView
                        onChange={props.setDistricts}
                        selection={props.districts}
                    />
                    <PricingView
                        onChange={props.setPricing}
                        selection={props.pricing}
                    />
                    <DieteticsView
                        onChange={props.setDietetics}
                        selection={props.dietetics}
                    />
                    <GastronomyView
                        onChange={props.setGastronomies}
                        selection={props.gastronomies}
                    />
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
    // Filters
    setGastronomies: (value: string[]) => void,
    setDistricts: (value: string[]) => void,
    setDietetics: (value: string[]) => void,
    setPricing: (value: Pricing) => void,
    gastronomies: string[],
    districts: string[],
    dietetics: string[],
    pricing: Pricing,
}