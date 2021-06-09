// React
import React, { memo, useEffect, useRef, useMemo, useState } from 'react'

// Components
import { Animated, ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native'
// import { Modalize, ModalizeProps } from './Modalize'
import { Modalize, ModalizeProps } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import DistrictFilter from './DistrictFilter'
import { FancyTabs, TouchableScale } from '@components'
import Header from './Header'

// Helpers
import { deepDiffer } from '@utils'

// Types
import { Props as DistrictFilterProps } from './DistrictFilter'
import { District } from '@types'
import { color, font, ui } from '@constants'

// Data
import * as data from './data'


export default memo((props: Props) => {

    const { location } = props;

    const { current: panY } = useRef(new Animated.Value(0));
    const scrollViewRef = useRef<ScrollView>();
    const modalRef = useRef<Modalize>();

    // const [districtSelection, setDistrictSelection] = useState(props.districtSelection);
    const [districtSelection, setDistrictSelection] = useState<DistrictSelection>([]);
    const [districts, setDistricts] = useState(data.districts);

    const [searchDisabled, setSearchDisabled] = useState(false);
    useEffect(() => setSearchDisabled(false), [location]);

    const fancyTabsRef = useRef<FancyTabs>();

    // import { deepDiffer } from '@utils'

    const { height } = useWindowDimensions();

    return (
        <Portal>
            <Modalize
                closeSnapPointStraightEnabled={false}
                onBackButtonPress={onBackButtonPress}
                // closeAnimationConfig={closeConfig}
                scrollViewProps={scrollViewProps}
                // openAnimationConfig={openConfig}
                panGestureAnimatedValue={panY}
                // overlayStyle={styles.overlay}
                contentRef={scrollViewRef}
                panGestureComponentEnabled
                modalStyle={styles.modal}
                disableScrollIfPossible
                adjustToContentHeight
                modalTopOffset={100}

                withOverlay={false}

                // modalHeight={}
                // modalTopOffset={height - 550}
                tapGestureEnabled
                alwaysOpen={60 + footerHeight}
                useNativeDriver
                threshold={400}
                // snapPoint={250}
                // dragToss={0.3}
                ref={modalRef}
                withHandle={false}
            >
                <Header
                    onOpenPress={() => {
                        modalRef.current?.open('top');
                    }}
                    onCleanPress={null}
                    onApplyPress={null}
                    canApply={props.canApply}
                    canClean={!searchDisabled && !props.canApply}
                />

                <FancyTabs
                    ref={fancyTabsRef}
                    onChange={({ item, index }) => {
                        console.log(`Scrolling to item: ${index}`)
                    }}
                    data={sections}
                />

                <DistrictFilter
                    // onChange={setDistrictSelection}
                    // selection={districtSelection}
                    onChange={props.setDistrict}
                    selection={props.district}
                    data={data.districts}
                />

                <View style={{ height: footerHeight }} />

            </Modalize>

            <Modalize
                // onBackButtonPress={onBackButtonPress}
                panGestureEnabled={false}
                alwaysOpen={footerHeight}
                adjustToContentHeight
                withOverlay={false}
                withHandle={false}
                modalStyle={{
                    shadowColor: 'transparent',
                }}
                useNativeDriver
            >
                <TouchableScale
                    onPress={() => {
                        setSearchDisabled(true);
                        props.onSearchPress(location);
                    }}
                    disabled={searchDisabled}
                    style={styles.footer}
                >
                    <Text
                        style={[
                            styles.search,
                            searchDisabled && {
                                color: color.lightGray,
                            },
                        ]}
                    >
                        Rechercher ici
                    </Text>
                </TouchableScale>
            </Modalize>
        </Portal>
    )
})

// Constants
const footerHeight = 50 + ui.safePaddingBottom

const sections = [
    { id: '0', name: 'Quartier' },
    { id: '1', name: 'Prix' },
    { id: '2', name: 'Diéthétique' },
    { id: '3', name: 'Gastronomie' },
]

// Styles
const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'transparent',
    },
    container: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    content: {
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    footer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        height: footerHeight,
    },
    search: {
        fontFamily: font.regular,
        textAlign: 'center',
        color: color.dark,
        fontSize: 18,
    },
})

// Constants
const scrollViewProps: ScrollViewProps = {
    contentContainerStyle: styles.content,
    keyboardShouldPersistTaps: 'handled',
    style: styles.container,
    overScrollMode: 'always',
    endFillColor: 'white',
    bounces: false,
}

const closeConfig: CloseAnimationConfig = {
    timing: { duration: 250 },
    spring: {
        stiffness: 150,
        damping: 15,
        mass: 1,
    },
}

const openConfig: OpenAnimationConfig = closeConfig

const onBackButtonPress = () => true

// Types
export type Props = {
    // setDistrictSelection: (selection: District[]) => void,
    // districtSelection: District[],
    // districts: District[],
    onFiltersChanged: (filters: Filters) => void, // @TODO: RENAME
    onSearchPress: (location: number[]) => void,
    location: number[],
    // filters: Filters,

    setDistrict: (district: string[]) => void,
    setPricing: (pricing: number[]) => void,
    district: string[],
    canApply: boolean,
    pricing: number[],
}

export type Filters = {
    district: string[],
    pricing: number[],
    // rating: number[],
}

export type Ref = Modalize

type CloseAnimationConfig = ModalizeProps['closeAnimationConfig']

type OpenAnimationConfig = ModalizeProps['openAnimationConfig']

type ScrollViewProps = ModalizeProps['scrollViewProps']

type OnDistrictSelectionChange = DistrictFilterProps['onChange']

type DistrictSelection = DistrictFilterProps['selection']