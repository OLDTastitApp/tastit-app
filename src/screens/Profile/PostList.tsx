// React
import React, { memo, useCallback } from 'react'

// Components
import { View, FlatList, StyleSheet } from 'react-native'
import PictureItem from './PictureItem'

// Helpers
import { useMe, useUser, useUserId, usePosts } from '@helpers'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useWindowDimensions } from 'react-native'

// Types
import { Post } from '@types'


export default memo((props: Props) => {

    const { type, userId } = props;

    // const [posts, postsResult] = usePosts({
    //     creatorId: userId,
    //     first: 10,
    // });

    const onPostPress = useCallback(
        (post: Post) => {},
        []
    );

    const [posts, postsResult] = usePosts({
        creatorId: userId,
        first: 10,
    });

    const { height } = useWindowDimensions();
    const edges = useSafeAreaInsets();
    const top = edges.top + 40;

    const backgroundColor = ({
        'mine': 'red',
        'tagged': 'purple',
        'liked': 'yellow',
    })[props.type];

    return (
        <View
            style={[
                styles.container,
                { height },
                { backgroundColor },
            ]}
        >
            {/* <FlatList
                renderItem={({ item, index }) => (
                    <PictureItem
                        onPress={onPostPress}
                        item={item.node}
                        index={index}
                    />
                )}
                keyExtractor={(item, i) => `${item}_${i}`}
                data={posts?.edges}
                numColumns={3}
            /> */}
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        // height: 400,
        // width: 100,
        // flex: 1,
    },
})

// Types
type Props = {
    type: 'mine' | 'tagged' | 'liked',
    userId: string,
}