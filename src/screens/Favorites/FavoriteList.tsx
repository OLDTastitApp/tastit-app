// React
import React, { memo } from 'react'

// Components
import { View, FlatList, Text, StyleSheet } from 'react-native'
import FavoriteItem from './FavoriteItem'
import ListHeader from './ListHeader'

// Helpers
import { useWindowDimensions } from 'react-native'
import { useFavorites } from '@helpers'

export default memo((props: Props) => {

    const { width } = useWindowDimensions();

    const [favorites, favoritesResult] = useFavorites({ first: 100 });

    return (
        <View style={[styles.container, { backgroundColor: 'white', width }]}>

            <FlatList
                renderItem={({ item }) => (
                    <FavoriteItem
                        item={item.node}
                        onPress={null}
                    />
                )}
                contentContainerStyle={{
                    paddingBottom: 120,
                }}
                // contentContainerStyle={{
                //     // paddingHorizontal: 5,
                //     // paddingBottom: 120,
                //     // marginTop: 10,
                // }}
                // keyExtractor={({ node: { id } }) => id}
                keyExtractor={({ node: { id } }, i) => `${i}`}
                data={favorites?.edges}
                // refreshing={refreshing}
                // onRefresh={onRefresh}
                ListHeaderComponent={() => (
                    <ListHeader
                        count={favorites?.edges?.length}
                        onCountPress={() => {}}
                        onRemovePress={() => {}}
                        name={'Favoris'}
                    />
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
        height: '100%',
    },
})

// Types
type Props = {
    // ...
}