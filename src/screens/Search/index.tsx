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
import UserItem from './UserItem'
import PostItem from './PostItem'
import Header from './Header'

// Helpers
import { usePlaces, useUsers, usePosts, useSearch } from '@helpers'
import { useNavigation } from '@navigation/utils'

// Types
import { Props as PlaceItemProps } from './PlaceItem'
import { Props as PostItemProps } from './PostItem'
import { Props as UserItemProps } from './UserItem'


export default memo((props: Props) => {

    const { searchAnimatedIndex, detailsAnimatedPosition } = props;

    const navigation = useNavigation();

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

    const [search, searchResult] = useSearch({
        skip: searchTextEmpty || index !== 0,
        text: searchText,
        first: 10,
    });

    if (searchResult.error) {
        console.log(searchResult.error);
    } else {
        console.log(`*** search: ${JSON.stringify(search, null, 4)}`);
    }

    const [places, placesResult] = usePlaces({
        // skip: searchTextEmpty || ![0, 2].includes(index),
        skip: searchTextEmpty || index !== 2,
        ...(index === 0 ? {
            name: searchText,
        } : {
            area: searchText,
        }),
        first: 10,
    });

    const [users, usersResult] = useUsers({
        skip: searchTextEmpty || index !== 1,
        searchText,
        first: 10,
    });

    const [posts, postsResult] = usePosts({
        skip: searchTextEmpty || index !== 3,
        tag: searchText,
        first: 10,
    });

    const onPlacePress = useCallback<OnPlacePress>(
        place => {
            Keyboard.dismiss();
            props.onPlacePress(place);
            setSearchText(undefined);
        },
        [props.onPlacePress]
    );

    const onUserPress = useCallback<OnUserPress>(
        user => {
            navigation.navigate('Profile', { userId: user.id, canGoBack: true });
            setSearchText(undefined);
        },
        [props.onUserPress]
    );

    const onPostPress = useCallback<OnPostPress>(
        post => {
            navigation.navigate('PostDetails', { id: post.id });
            setSearchText(undefined);
        },
        [props.onPostPress]
    );

    const data = [search, users, places, posts][index];

    // console.log(`searchText: ${searchText}`)
    // console.log(`places: ${places?.edges?.length}`)
    const hasItems = data?.edges?.length > 0;
    const noResults = searchText?.length > 0 && !hasItems;
    const empty = !(searchText?.length > 0) && !hasItems;

    // console.log(`users: ${users?.edges?.length}`);
    // console.log(`places.error: ${placesResult.error}`);

    const renderItem = ({ item }) => {

        console.log(`__typename: ${item.node.__typename}`);
        const { __typename } = item.node;

        if (__typename === 'Place') {
            return (
                <PlaceItem
                    onPress={onPlacePress}
                    item={item.node}
                />
            )
        }

        if (__typename === 'User') {
            return (
                <UserItem
                    onPress={onUserPress}
                    item={item.node}
                />
            )
        }

        if (__typename === 'Post') {
            return (
                <PostItem
                    searchText={searchText}
                    onPress={onPostPress}
                    item={item.node}
                />
            )
        }

        // return ({
        //     place: () => (
        //         <PlaceItem
        //             onPress={onPlacePress}
        //             item={item.node}
        //         />
        //     ),
        //     user: () => (
        //         <UserItem
        //             onPress={onUserPress}
        //             item={item.node}
        //         />
        //     ),
        //     post: () => (
        //         <PostItem
        //             searchText={searchText}
        //             onPress={onPostPress}
        //             item={item.node}
        //         />
        //     )
        // })[typeMap[index]]();
    };

    if (postsResult.error) {
        console.log(JSON.stringify(postsResult.error, null, 4))
    } else {
        console.log(JSON.stringify(posts, null, 4))
    }

    return (
        <View
            style={[StyleSheet.absoluteFill, { flex: 1 }]}
            pointerEvents='box-none'
        >
            <Background focused={focused} />

            <Header
                detailsAnimatedPosition={detailsAnimatedPosition}
                searchAnimatedIndex={searchAnimatedIndex}
                onSearchTextChanged={setSearchText}
                onBackPress={onBackPress}
                searchText={searchText}
                onFocus={onFocus}
                onBlur={onBlur}
            />

            {focused && (
                <>
                    <SectionHeader
                        onChanged={setIndex}
                        sections={sections}
                        index={index}
                    />

                    <FlatList
                        // renderItem={({ item }) => (
                        //     <PlaceItem
                        //         onPress={onPlacePress}
                        //         item={item.node}
                        //     />
                        // )}
                        renderItem={renderItem}
                        ListEmptyComponent={() => (
                            empty ? (
                                <EmptyPlaceholder />
                            ) : noResults ? (
                                <NoResults />
                            ) : null
                        )}
                        // contentContainerStyle={{ paddingVertical: 20, paddingBottom: 300 }}
                        contentContainerStyle={{ paddingBottom: 300 }}
                        keyExtractor={({ node: { id } }) => id}
                        keyboardShouldPersistTaps='handled'
                        // keyboardDismissMode='on-drag'
                        data={data?.edges as any}
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

// Constants
const typeMap = {
    0: 'place',
    1: 'user',
    2: 'place',
    3: 'post',
}

const sections = [
    { id: 'top', name: 'Top' },
    { id: 'accounts', name: 'Comptes' },
    { id: 'places', name: 'Lieux' },
    { id: 'hashtags', name: 'Hashtags' },
]

// Styles
const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
    },
})

// Types
export type Props = {
    detailsAnimatedPosition: Animated.SharedValue<number>,
    searchAnimatedIndex: Animated.SharedValue<number>,
    onPlacePress: OnPlacePress,
    onPostPress: OnPostPress,
    onUserPress: OnUserPress,
    onBackPress: () => void,
}

type OnPlacePress = PlaceItemProps['onPress']
type OnPostPress = PostItemProps['onPress']
type OnUserPress = UserItemProps['onPress']