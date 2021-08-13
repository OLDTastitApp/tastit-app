// React
import React, { memo, useState, useCallback } from 'react'

// Components
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import FavoriteItem from './FavoriteItem'
import { TouchableScale } from '@components'

// Helpers
import { useWindowDimensions } from 'react-native'
import { usePlaceListItems } from '@helpers'
import { delay } from '@utils'

// Constants
import { color } from '@constants'

// Types
import { Place } from '@types'


export default memo((props: Props) => {

    const { width } = useWindowDimensions();

    const backgroundColor = `#${Math.random().toString(16).substr(-6)}`;

    const [placeListItems, placeListItemsResult] = usePlaceListItems({
        placeListId: props.id, first: 100,
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await Promise.all([
                placeListItemsResult.refetch(),
                delay(1000),
            ]);
        } finally {
            setRefreshing(false);
        }
    };

    const onOptionsPress = useCallback(
        (item: Place) => {
            props.onOptionsPress(item, props.id);
        },
        [props.id]
    );

    return (
        <View style={[styles.container, { width }]}>
            <FlatList
                renderItem={({ item }) => (
                    <FavoriteItem
                        onLikePress={props.onLikePress}
                        onMorePress={onOptionsPress}
                        onPress={props.onPress}
                        item={item.node}
                    />
                )}
                keyExtractor={({ node: { id } }) => id}
                contentContainerStyle={styles.content}
                data={placeListItems?.edges}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListEmptyComponent={() => (
                    <View style={styles.header}>
                        {/* <MaterialIcons
                            // name='heart-plus-outline'
                            color={color.lightGray}
                            name='playlist-add'
                            size={60}
                        /> */}
                        <Text style={styles.title}>
                            Vous n'avez aucune place
                        </Text>
                        {/* <View style={{
                            width: 100,
                            height: 1,
                            backgroundColor: '#f2f2f2',
                            marginVertical: 30,
                        }} /> */}
                        <TouchableScale style={{
                            // backgroundColor: '#f2f2f2',
                            backgroundColor: color.lightGray,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 50,

                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontFamily: 'Avenir Next',
                                // color: color.mediumGray,
                                fontWeight: 'bold',
                                color: 'white',
                                fontSize: 14,
                            }}>
                                Supprimer la liste
                            </Text>
                        </TouchableScale>
                    </View>
                )}
            />
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
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
    onOptionsPress: (item: Place, placeListId: string) => void,
    onLikePress: (item: Place) => void,
    onPress: (item: Place) => void,
    id: string,
}