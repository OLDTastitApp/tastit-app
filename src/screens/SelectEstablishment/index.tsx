// React
import React, { memo, useState, useCallback, useRef } from 'react'

// Components
import { View, FlatList, Text, ScrollView, StatusBar, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@navigation/utils'
import { TouchableScale, MessagePopup } from '@components'
// import ContentInput from './ContentInput'
// import Section from './Section'
import NavBar from './NavBar'
// import Footer from './Footer'
// import Row from './Row'
import GeolocationError from './GeolocationError'
// import PlaceItem from '../Search/PlaceItem'
import NearestPlace from './NearestPlace'
import Header from './Header'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'

// Helpers
import useLocation from './useLocation'
// import useSubmit from './useSubmit'
import usePlaces from './usePlaces'

// Constants
import { ui, font, color, style } from '@constants'

// Types
import { Props as NearestPlaceProps } from './NearestPlace'
import { MessagePopupRef } from '@components'


export default memo(() => {

    const navigation = useNavigation();
    const route = useRoute<'SelectEstablishment'>();

    const { setEstablishment } = route.params;
    
    const [search, setSearch] = useState<string>();
    const location = useLocation();

    const [nearestPlaceHidden, setNearestPlaceHidden] = useState(false);

    const [nearestPlaces] = usePlaces({
        skip: location.loading,
        around: location.data,
        limit: 1,
    });

    const [places] = usePlaces({
        search, limit: 10,
    });

    const onOpenSettingsPress = () => {
        // ...
    };

    const onPlaceItemPress = useCallback<OnPlaceItemPress>(
        item => {
            setEstablishment(item);
            navigation.goBack();
        },
        []
    );

    const onDismissPress = useCallback(() => setNearestPlaceHidden(true), []);

    const hasNearestPlace = !nearestPlaceHidden && nearestPlaces?.edges?.length > 0;

    return (
        <View style={style.container}>
            <NavBar
                onBackPress={navigation.goBack}
                barStyle='dark-content'
            />

            <Header
                onQueryChanged={setSearch}
                query={search}
            />

            <KeyboardAwareFlatList
                ListHeaderComponent={() => (
                    <>
                        {location.error && (
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
                        )}
                    </>
                )}
                renderItem={({ item }) => (
                    null
                    // <PlaceItem
                    //     onPress={onPlaceItemPress}
                    //     item={item.node}
                    // />
                )}
                keyExtractor={({ node }) => node.id}
                keyboardShouldPersistTaps='handled'
                // keyboardDismissMode='interactive'
                enableResetScrollToCoords
                data={places?.edges}
            />
            
            {/* <ScrollView>
                <Text>
                    {JSON.stringify(location, null, 4)}
                    {JSON.stringify(places, null, 4)}
                </Text>
            </ScrollView> */}
        </View>
    )
})

// Types
type OnPlaceItemPress = NearestPlaceProps['onSelectPress']