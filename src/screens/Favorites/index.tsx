// React
import React, { memo, useState, useMemo } from 'react'

// Components
import { FlatList, StyleSheet } from 'react-native'
import AwesomeTabs from '@components/AwesomeTabs'
import Animated from 'react-native-reanimated'
import FavoriteList from './FavoriteList'
import PlaceList from './PlaceList'
import Header from './Header'

// Components
import { View } from 'react-native'

// Helpers
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { usePlaceLists, usePlaceListItems } from '@helpers'
import { useWindowDimensions } from 'react-native'


export default memo(() => {

    const [index, setIndex] = useState(0);

    const { width } = useWindowDimensions();

    const [placeLists, placeListsResult] = usePlaceLists({ first: 100 });

    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    }, []);

    const tabs = useMemo(
        () => {
            const lists = placeLists?.edges?.map(
                ({ node }) => node
            ) ?? [];
            return [MY_FAVORITES, ...lists];
        },
        [placeLists]
    );

    console.log(`placeLists: ${placeLists?.edges?.length}`)

    return (
        <View style={styles.container}>

            <Header title='Lieux aimés' />

            <AwesomeTabs
                pageWidth={width}
                scrollX={scrollX}
                data={tabs}
            />
            
            <AnimatedFlatList
                renderItem={({ item, index }) => (
                    index !== 0 ? (
                        <PlaceList
                            id={(item as any).id}
                        />
                    ) : (
                        <FavoriteList />
                    )
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={({ id }) => id}
                scrollEventThrottle={16}
                decelerationRate='fast'
                onScroll={onScroll}
                pagingEnabled
                data={tabs}
                horizontal
            />

        </View>
    )
})

// Constants
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const MY_FAVORITES = { id: '0', name: 'Mes likes' }

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
})