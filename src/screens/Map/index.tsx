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
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useWindowDimensions } from 'react-native'
import { usePlaces, useLocation } from '@helpers'

// Utils
import Geolocation from '@react-native-community/geolocation'

// Constants
import { style } from '@constants'

// Types
import { Place, User, Post, Pricing } from '@types'
import { Props as SearchProps } from '../Search'
import { Props as MarkerProps } from './Marker'
import { Props as MapProps } from './Map'

// https://github.com/react-native-geolocation/react-native-geolocation#watchposition


// [longitude, latitude]
const defaultLocation = [2.3488, 48.8534];

export default memo(() => {

    const navigation = useNavigation();
    const { height } = useWindowDimensions();

    const searchModalRef = useRef<BottomSheetModal>(null);
    const placeDetailsModalRef = useRef<BottomSheetModal>(null);

    const searchAnimatedIndex = useSharedValue(0);
    const detailsAnimatedPosition = useSharedValue(height);

    const [place, setPlace] = useState<Place>();
    const [location, setLocation] = useState(defaultLocation);
    const [mapLocation, setMapLocation] = useState(defaultLocation);

    // const locationResult = useLocation();
    // locationResult.

    // Filters
    const [pricing, setPricing] = useState<Pricing>();
    const [districts, setDistricts] = useState<string[]>([]);
    const [dietetics, setDietetics] = useState<string[]>([]);
    const [gastronomies, setGastronomies] = useState<string[]>([]);

    const [filters, setFilters] = useState<Filters | {}>({});

    // useFocusEffect(() => {
    //     console.log(`Hello`)
    //     // Geolocation.getCurrentPosition(
    //     //     position => {
    //     //         const { longitude, latitude } = position.coords;
    //     //         setLocation([longitude, latitude]);
    //     //     },
    //     //     error => {},
    //     //     { enableHighAccuracy: true }
    //     // );
    // });

    useEffect(
        () => {
            Geolocation.getCurrentPosition(
                position => {
                    const { longitude, latitude } = position.coords;
                    // setLocation([longitude, latitude]);
                    console.log(`position: ${JSON.stringify({ longitude, latitude }, null, 4)}`);
                    setLocation([longitude, latitude]);
                },
                error => {},
                { enableHighAccuracy: true }
            );
        },
        []
    );

    const onBackPress = () => {
        if (place) {
            setPlace(null);
        } else {
            searchModalRef.current.snapToIndex(0);
            setLocation(defaultLocation);
            setTimeout(() => navigation.goBack(), 250);
        }
    };
    
    const onMarkerPress = useCallback<OnMarkerPress>(
        place => {
            console.log(`placePress: ${place.name}`);
            // placeDetailsModalRef.current.present();
            setPlace(place);
        },
        []
    );

    const onPlacePress = useCallback<OnPlacePress>(
        place => {
            // console.log(`placePress: ${place.name}`)
            // placeDetailsModalRef.current.present();
            setPlace(place);
        },
        []
    );

    const onRegionChanged = useCallback<OnRegionChanged>(
        region => {
            const { longitude, latitude } = region;
            setMapLocation([longitude, latitude]);
        },
        []
    );

    const onSearchHerePress = async () => {
        // setLocation(mapLocation);
        searchModalRef.current.snapToIndex(0);

        // console.log(`dietetics: ${JSON.stringify(dietetics, null, 4)}`);
        // console.log(`placesResult.refetch(${JSON.stringify({
        //     pricing: pricing ? [pricing.index] : undefined,
        //     around: mapLocation,
        //     zip: districts,
        //     radius: 10000,
        //     first: 10,
        // }, null, 4)})`);

        placesResult.refetch({
            pricing: pricing ? [pricing.index] : undefined,
            around: mapLocation,
            category: dietetics,
            tag: gastronomies,
            zip: districts,
            radius: 10000,
            first: 10,
        });
    };

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
        // ...filters,
    });

    useEffect(
        () => {
            console.log(`places changed: ${places?.edges?.[0]?.node.name}`);
        },
        [places]
    );

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

    const onUserPress = useCallback(
        (user: User) => {},
        []
    );

    const onPostPress = useCallback(
        (post: Post) => {},
        []
    );

    if (placesResult.error) {
        // return null;
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
                    setDietetics={setDietetics}
                    dietetics={dietetics}
                    districts={districts}
                    setDistricts={setDistricts}
                    gastronomies={gastronomies}
                    setGastronomies={setGastronomies}
                    pricing={pricing}
                    setPricing={setPricing}
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
                onPress={onSearchHerePress}
                disabled={false}
            />

            <Search
                detailsAnimatedPosition={detailsAnimatedPosition}
                searchAnimatedIndex={searchAnimatedIndex}
                onPlacePress={onPlacePress}
                onBackPress={onBackPress}
                onPostPress={onPostPress}
                onUserPress={onUserPress}
            />

        </View>
    )
})

// Types
type OnPlacePress = SearchProps['onPlacePress']

type OnRegionChanged = MapProps['onChanged']

type RenderMarker = MapProps['renderMarker']

type OnMarkerPress = MarkerProps['onPress']

type Filters = {
    category: string[],
    pricing: number[],
    tags: string[],
    zip: string[],
}