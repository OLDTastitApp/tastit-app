// React
import React, { memo } from 'react'

// Components
import { View, FlatList, Text, StyleSheet } from 'react-native'
import FavoriteItem from './FavoriteItem'

// Helpers
import { useWindowDimensions } from 'react-native'
import { usePlaceListItems } from '@helpers'

// Types
import { Place } from '@types'


export default memo((props: Props) => {

    const { width } = useWindowDimensions();

    const backgroundColor = `#${Math.random().toString(16).substr(-6)}`;

    const [favorites, favoritesResult] = usePlaceListItems({
        placeListId: props.id, first: 100,
    });

    return (
        <View style={[styles.container, { backgroundColor, width }]} />
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
    onLikePress: (item: Place) => void,
    onPress: (item: Place) => void,
    id: string,
}