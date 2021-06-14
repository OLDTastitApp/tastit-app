// React
import React, { memo, useState, useCallback, useRef, useMemo, useEffect } from 'react'

// Components
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import SearchModalFooter from '../SearchModal/Footer'
import PlaceDetailsModal from '../PlaceDetailsModal'
import SearchModal from '../SearchModal'
import Search from '../Search'
import Marker from './Marker'
import Map from './Map'

// Helpers
import { useIsFocused, useNavigation } from '@react-navigation/native'
// import { useNavigation } from '@navigation/utils'
import useFilters from './useFilters'
import useRegion from './useRegion'
import usePlaces from './usePlaces'

// Constants
import { font, color, style } from '@constants'

// Types
import { Props as SearchProps } from '../Search'
import { District, Establishment, Place } from '@types'
import { Props as MarkerProps } from './Marker'
import { Props as MapProps } from './Map'
// import { Establishment,  } from './data'

// Data
import { districts, response } from './data'

// https://github.com/react-native-geolocation/react-native-geolocation#watchposition


const initialRegion = {
    longitudeDelta: 0.02,
    latitudeDelta: 0.02,
    longitude: 2.3488,
    latitude: 48.8534,
};

export default memo(() => {

    const focused = useIsFocused();
    const navigation = useNavigation();

    // const searchRef = useRef<SearchRef>(null);
    const searchModalRef = useRef<BottomSheetModal>(null);
    const placeDetailsModalRef = useRef<BottomSheetModal>(null);

    const animatedIndex = useSharedValue(0);

    const [districtSelection, setDistrictSelection] = useState<District[]>([]);
    const [place, setPlace] = useState<Place>();

    const [location, setLocation] = useState([2.3488, 48.8534]);
    // const [region, setRegion] = useRegion({
    //     defaultLongitude: 2.3488,
    //     defaultLatitude: 48.8534,
    // });

    const filters = useFilters();

    const onFiltersChanged = useCallback(() => {
        console.log(`Filters changed !`);
    }, []);

    const onBackPress = () => {
        setPlace(null);
        places.clear();
        setTimeout(() => {
            navigation.goBack();
        }, 250)
    };

    const onClosePress = () => setPlace(null);
    
    const onMarkerPress = useCallback<OnMarkerPress>(
        place => setPlace(place),
        []
    );

    const onPlacePress = useCallback<OnPlacePress>(
        place => setPlace(place),
        []
    );

    const onRegionChanged = useCallback<OnRegionChanged>(
        region => {
            const { longitude, latitude } = region;
            setLocation([longitude, latitude]);
            // setRegion(value => ({ ...value, longitude, latitude }));
            // console.log(JSON.stringify(region))
        },
        []
    );

    const onSearchPress = useCallback(
        // () => searchRef.current?.show(),
        () => {},
        []
    );

    const onSearchHerePress = useCallback(
        (location: number[]) => {
            places.fetch({ around: location, first: 5 });
        },
        []
    );

    const places = usePlaces();
    
    // useEffect(
    //     () => {
    //         (async () => {
    //             places.fetch({ around: location, first: 5 });
    //         })();
    //     },
    //     [location]
    // );

    const renderMarker = useCallback<RenderMarker>(
        ({ item, focusedPlace }) => (
            <Marker
                selected={item === focusedPlace}
                onPress={onMarkerPress}
                key={item.id}
                id={item.id}
                item={item}
            />
        ),
        []
    );
    return (
        <View style={style.container}>

            <Map
                initialRegion={initialRegion}
                // focusedPlace={establishment}
                // onChanged={onRegionChanged}
                // renderMarker={renderMarker}
                data={places.data}
            />

            <BottomSheetModalProvider>
                <SearchModal
                    animatedIndex={animatedIndex}
                    modalRef={searchModalRef}
                />

                <PlaceDetailsModal
                    modalRef={placeDetailsModalRef}
                    place={place}
                />
            </BottomSheetModalProvider>

            <SearchModalFooter
                animatedIndex={animatedIndex}
                onPress={() => {}}
                disabled={false}
            />

            <Search
                animatedIndex={animatedIndex}
                onPlacePress={onPlacePress}
                onBackPress={onBackPress}
            />

            {/* <Map
                initialRegion={initialRegion}
                focusedPlace={establishment}
                onChanged={onRegionChanged}
                renderMarker={renderMarker}
                data={places.data}
            />

            {focused && !establishment && (
                <SearchModal
                    onFiltersChanged={onFiltersChanged}
                    onSearchPress={onSearchHerePress}
                    location={location}
                    // filters={filters}
                    // setDistrictSelection={setDistrictSelection}
                    // districtSelection={districtSelection}
                    // districts={districts}
                    setDistrict={filters.setDistrict}
                    setPricing={filters.setPricing}
                    canApply={filters.canApply}
                    district={filters.district}
                    pricing={filters.pricing}
                />
            )}

            {establishment && (
                <EstablishmentDetails
                    establishment={establishment}
                    visible={!!establishment}
                />
            )}

            <Search
                onPlacePress={onPlacePress}
                ref={searchRef}
            /> */}

        </View>
    )
})

// Types
type OnPlacePress = SearchProps['onPlacePress']

type OnRegionChanged = MapProps['onChanged']

type RenderMarker = MapProps['renderMarker']

type OnMarkerPress = MarkerProps['onPress']