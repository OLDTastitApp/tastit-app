// React
import React, { memo, useState, useCallback } from 'react'

// Components
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import FavoriteItem from './FavoriteItem'
import ListHeader from './ListHeader'

// Helpers
import { useFavorites, useLikePlace, useDislikePlace } from '@helpers'
import { useWindowDimensions } from 'react-native'
import { delay } from '@utils'

// Constants
import { color } from '@constants'

// Types
import { Place } from '@types'


export default memo((props: Props) => {

    const { width } = useWindowDimensions();

    const [favorites, favoritesResult] = useFavorites({ first: 100 });

    const [dislikePlace, dislikePlaceResult] = useDislikePlace();
    const [likePlace, likePlaceResult] = useLikePlace();

    const onLikePress = useCallback(
        async (item: Place) => {
            if (item.liked) {
                await dislikePlace({ placeId: item.id });
            } else {
                await likePlace({ placeId: item.id });
            }
        },
        []
    );

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await Promise.all([
                favoritesResult.refetch(),
                delay(1000),
            ]);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <View style={[styles.container, { width }]}>

            <FlatList
                renderItem={({ item }) => (
                    <FavoriteItem
                        onLikePress={onLikePress}
                        onPress={props.onPress}
                        item={item.node}
                        favorite
                    />
                )}
                contentContainerStyle={styles.content}
                // contentContainerStyle={{
                //     // paddingHorizontal: 5,
                //     // paddingBottom: 120,
                //     // marginTop: 10,
                // }}
                keyExtractor={({ node: { id } }) => id}
                // keyExtractor={({ node: { id } }, i) => `${i}`}
                data={favorites?.edges}
                // refreshing={refreshing}
                // onRefresh={onRefresh}
                // ListHeaderComponent={() => (
                //     <ListHeader
                //         count={favorites?.edges?.length}
                //         onCountPress={() => {}}
                //         onRemovePress={() => {}}
                //         name={'Favoris'}
                //     />
                // )}
                refreshing={refreshing}
                onRefresh={onRefresh}
                // contentCon={{ flexGrow: 1 }}
                ListEmptyComponent={() => (
                    <View style={styles.header}>
                        <MaterialCommunityIcons
                            // name='heart-plus-outline'
                            name='heart-circle-outline'
                            color={color.lightGray}
                            size={60}
                        />
                        <Text style={styles.title}>
                            Ajoutez des lieux
                        </Text>
                    </View>
                )}
            />

            {/* <Text style={{ color: 'white' }}>
                ___ {JSON.stringify(favorites, null, 4)} ___
            </Text> */}
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // height: '100%',
    },
    content: {
        paddingBottom: 120,
        paddingTop: 10,
        flexGrow: 1,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontFamily: 'Avenir Next',
        color: color.lightGray,
        fontWeight: '600',
        marginTop: 10,
        fontSize: 20,
    },
})

// Types
type Props = {
    onLikePress: (item: Place) => void,
    onPress: (item: Place) => void,
}