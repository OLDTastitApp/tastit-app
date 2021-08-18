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
import { useWindowDimensions } from 'react-native'
// import { useNavigation } from '@navigation/utils'
import useFilters from './useFilters'
import useRegion from './useRegion'
// import usePlaces from './usePlaces'
import { usePlaces } from '@helpers'

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

const defaultLocation = [2.3488, 48.8534];

export default memo(() => {

    // const focused = useIsFocused();
    const navigation = useNavigation();

    // const searchRef = useRef<SearchRef>(null);
    const searchModalRef = useRef<BottomSheetModal>(null);
    const placeDetailsModalRef = useRef<BottomSheetModal>(null);

    const { height } = useWindowDimensions();

    const searchAnimatedIndex = useSharedValue(0);
    const detailsAnimatedPosition = useSharedValue(height);

    const [districtSelection, setDistrictSelection] = useState<District[]>([]);
    const [place, setPlace] = useState<Place>();

    const [location, setLocation] = useState(defaultLocation);
    const [mapLocation, setMapLocation] = useState(defaultLocation);
    // const [region, setRegion] = useRegion({
    //     defaultLongitude: 2.3488,
    //     defaultLatitude: 48.8534,
    // });

    // const filters = useFilters();

    const onFiltersChanged = useCallback(() => {
        console.log(`Filters changed !`);
    }, []);

    const onBackPress = () => {
        if (place) {
            setPlace(null);
            // places.clear();
        } else {
            searchModalRef.current.snapToIndex(0);
            setLocation(defaultLocation);
            setTimeout(() => navigation.goBack(), 250);
            // places.clear();
        }
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
            setMapLocation([longitude, latitude]);
            // setRegion(value => ({ ...value, longitude, latitude }));
            // console.log('location changed: ', JSON.stringify(region))
        },
        []
    );

    const onSearchPress = useCallback(
        // () => searchRef.current?.show(),
        () => {},
        []
    );

    const onSearchHerePress = useCallback(
        // (location: number[]) => {
        async () => {
            console.log('search here pressed !')
            // places.fetch({ around: location, first: 5 });
            // const result = await placesResult.refetch({
            //     around: location,
            //     radius: 10000,
            //     first: 10,
            // });
            setLocation(mapLocation);
            searchModalRef.current.snapToIndex(0);

            // console.log(`places fetched !!: ${result?.data.places?.edges?.[0]?.node.name}`);
            // console.log(`places error !!: ${JSON.stringify(result, null, 4)}`);
        },
        // [location]
        [mapLocation]
    );

    // const skipRefetch = !!location && JSON.stringify(location) != JSON.stringify(mapLocation);
    // const skipRefetch = JSON.stringify(location) != JSON.stringify(mapLocation);

    const [places, placesResult] = usePlaces({
        // skip: searchTextEmpty,// || index !== 0,
        // searchText,
        // skip: skipRefetch,
        around: location ?? defaultLocation,
        // skip: !location,

        radius: 10000,
        first: 10,
    });

    useEffect(
        () => {
            console.log(`places changed: ${places?.edges?.[0]?.node.name}`);
        },
        [places]
    );

    // const places = usePlaces();
    
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

    const onPlaceDetailsClosed = useCallback(() => setPlace(null), []);

    if (placesResult.error) {
        return (<ScrollView>
            <Text>{JSON.stringify(placesResult.error, null, 4)}</Text>
        </ScrollView>)
    }

    return (
        <View style={style.container}>

            <Map
                // initialRegion={initialRegion}
                location={location || defaultLocation}
                onMarkerPress={onMarkerPress}
                onChanged={onRegionChanged}
                renderMarker={renderMarker}
                focusedPlace={place}
                data={places?.edges}
            />

            <BottomSheetModalProvider>
                <SearchModal
                    animatedIndex={searchAnimatedIndex}
                    modalRef={searchModalRef}
                />

                <PlaceDetailsModal
                    animatedPosition={detailsAnimatedPosition}
                    onClosed={onPlaceDetailsClosed}
                    modalRef={placeDetailsModalRef}
                    place={place}
                />
            </BottomSheetModalProvider>

            <SearchModalFooter
                detailsAnimatedPosition={detailsAnimatedPosition}
                animatedIndex={searchAnimatedIndex}
                // onPress={() => {}}
                onPress={onSearchHerePress}
                disabled={false}
            />

            <Search
                detailsAnimatedPosition={detailsAnimatedPosition}
                searchAnimatedIndex={searchAnimatedIndex}
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