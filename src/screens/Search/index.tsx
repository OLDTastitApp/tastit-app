// React
import React, { memo, useState, useRef, useEffect, useCallback } from 'react'

// Components
import { View, Text, FlatList, StyleSheet, Keyboard } from 'react-native'
import EmptyPlaceholder from './EmptyPlaceholder'
import Animated from 'react-native-reanimated'
import SectionHeader from './SectionHeader'
import Background from './Background'
import NoResults from './NoResults'
import PlaceItem from './PlaceItem'
import Header from './Header'

// Helpers
import { usePlaces } from '@helpers'

// Types
import { Props as PlaceItemProps } from './PlaceItem'


export default memo((props: Props) => {

    const { animatedIndex } = props;

    // const onFocus: () => 
    const [searchText, setSearchText] = useState<string>();
    const [focused, setFocused] = useState(false);
    const [index, setIndex] = useState(0);

    const searchTextEmpty = !(searchText?.length > 0);

    const onBackPress = () => {
        // const empty = !(searchText?.length > 0);
        setSearchText(undefined);

        if (!focused) {
            props.onBackPress();
        } else {
            Keyboard.dismiss();
            onBlur();
        }
    };

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const [places, placesResult] = usePlaces({
        skip: searchTextEmpty,// || index !== 0,
        searchText,
        first: 10,
    });

    const onPlacePress = useCallback<OnPlacePress>(
        place => {
            Keyboard.dismiss();
            props.onPlacePress(place);
        },
        [props.onPlacePress]
    );

    // console.log(`searchText: ${searchText}`)
    // console.log(`places: ${places?.edges?.length}`)
    const hasPlaces = places?.edges?.length > 0;
    const noResults = searchText?.length > 0 && !hasPlaces;
    const empty = !(searchText?.length > 0) && !hasPlaces;

    return (
        <View
            style={[StyleSheet.absoluteFill, { flex: 1 }]}
            pointerEvents='box-none'
        >
            <Background focused={focused} />

            <Header
                onSearchTextChanged={setSearchText}
                animatedIndex={animatedIndex}
                onBackPress={onBackPress}
                searchText={searchText}
                onFocus={onFocus}
                onBlur={onBlur}
            />

            {focused && (
                <>
                    <SectionHeader
                        onChanged={setIndex}
                        index={index}
                    />

                    <FlatList
                        renderItem={({ item }) => (
                            <PlaceItem
                                onPress={onPlacePress}
                                item={item.node}
                            />
                        )}
                        ListEmptyComponent={() => (
                            empty ? (
                                <EmptyPlaceholder />
                            ) : noResults ? (
                                <NoResults />
                            ) : null
                        )}
                        contentContainerStyle={{ paddingVertical: 20 }}
                        keyExtractor={({ node: { id } }) => id}
                        keyboardShouldPersistTaps='handled'
                        data={places?.edges}
                    />

                    {/* <ScrollView keyboardShouldPersistTaps='handled'>
                        <Text>
                            {placesResult.error && JSON.stringify(placesResult.error, null, 4)}
                        </Text>
                    </ScrollView> */}
                </>
            )}
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
    },
})

// Types
export type Props = {
    animatedIndex: Animated.SharedValue<number>,
    onPlacePress: OnPlacePress,
    onBackPress: () => void,
}

type OnPlacePress = PlaceItemProps['onPress']