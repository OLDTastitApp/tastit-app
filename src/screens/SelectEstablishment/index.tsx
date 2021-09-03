// React
import React, { memo, useState, useCallback, useRef } from 'react'

// Components
import { View, FlatList, Text, ScrollView, StatusBar, StyleSheet, LayoutAnimation } from 'react-native'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from '@navigation/utils'
import SelectedPlaceItem from './SelectedPlaceItem'
import PlaceItem from '../Search/PlaceItem'
import NavBar from './NavBar'

// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'

// Helpers
import { usePlaces } from '@helpers'

// Constants
import { ui, font, color, style } from '@constants'

// Types
import { Props as PlaceItemProps } from '../search/PlaceItem'
import { Props as NearestPlaceProps } from './NearestPlace'
import { MessagePopupRef } from '@components'
import { Place } from '@types'


export default memo(() => {

    const navigation = useNavigation();
    const { params } = useRoute<'SelectEstablishment'>();

    // const { setPlace, place } = route.params;

    const [searchText, setSearchText] = useState<string>();
    const [focused, setFocused] = useState(false);

    // const [place, setPlace] = useState(params?.place);

    const { current: selectionSet } = useRef(
        new Set<string>(params.place ? [params.place.id] : [])
    );
    const [selection, setSelection] = useState(
        params.place ? [params.place] : []
    );

    const searchTextEmpty = !(searchText?.length > 0);

    const [places, placesResult] = usePlaces({
        skip: searchTextEmpty,// || index !== 0,
        name: searchText,
        // searchText,
        first: 10,
    });

    // const onDismissPress = useCallback(() => setNearestPlaceHidden(true), []);

    // const hasNearestPlace = !nearestPlaceHidden && nearestPlaces?.edges?.length > 0;

    const hasPlaces = places?.edges?.length > 0;
    const noResults = searchText?.length > 0 && !hasPlaces;
    const empty = !(searchText?.length > 0) && !hasPlaces;

    // const onPress = useCallback<OnPress>(
    //     item => {
    //         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //         const selected = selectionSet.has(item.id);

    //         selectionSet.clear();
    //         setSelection(selected ? [] : [item]);
    //     },
    //     []
    // );

    // const canSubmit = !!(place || params.place);
    const canSubmit = selection.length > 0 || !!params?.place;

    const onSubmitPress = () => {
        // params.setPlace(selection?.[0]);
        // navigation.goBack();
    };

    const onSelectPress = useCallback<OnPress>(
        item => {
            params.setPlace(item);
            navigation.goBack();
        },
        []
    );

    const onRemovePress = () => {
        params.setPlace(null);
        navigation.goBack();
    };

    // console.log(placesResult.error, null, 4)

    return (
        <View style={style.container}>
            <NavBar
                // onBackPress={navigation.goBack}
                // barStyle='dark-content'
                onSearchTextChanged={setSearchText}
                onBackPress={navigation.goBack}
                onSubmitPress={onSubmitPress}
                searchText={searchText}
                barStyle='dark-content'
                canSubmit={canSubmit}
            />

            <KeyboardAwareFlatList
                ListHeaderComponent={() => (
                    <>
                        {selection?.length > 0 && searchTextEmpty && (
                            <PlaceItem
                                onPress={onRemovePress}
                                item={selection[0]}
                                removable
                            />
                        )}
                        {/* <FlatList
                            showsHorizontalScrollIndicator={false}
                            // contentContainerStyle={{
                            //     paddingHorizontal: 10,
                            // }}
                            style={{ marginBottom: selection?.length > 0 ? 20 : 0 }}
                            renderItem={({ item }) => (
                                <SelectedPlaceItem
                                    // selected={selectionSet.has(item.id)}
                                    onPress={onPress}
                                    item={item}
                                />
                            )}
                            keyExtractor={({ id }) => id}
                            data={selection}
                            horizontal
                        /> */}
                        {/* {location.error && (
                            <GeolocationError
                                onPress={onOpenSettingsPress}
                            />
                        )}
                        {hasNearestPlace && (
                            <NearestPlace
                                item={nearestPlaces.edges[0].node}
                                // onPress={() => {}}
                                onSelectPress={onPlaceItemPress}
                                onDismissPress={onDismissPress}
                            />
                        )} */}
                    </>
                )}
                renderItem={({ item }) => (
                    // null
                    <PlaceItem
                        // onPress={onPlaceItemPress}
                        // onPress={onPress}
                        onPress={onSelectPress}
                        item={item.node}
                    />
                    
                )}
                keyExtractor={({ node }) => node.id}
                keyboardShouldPersistTaps='handled'
                // keyboardDismissMode='interactive'
                enableResetScrollToCoords
                data={places?.edges}
            />
        </View>
    )
})

// Types
type OnPlaceItemPress = NearestPlaceProps['onSelectPress']

type OnPress = PlaceItemProps['onPress']