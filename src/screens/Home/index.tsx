// React
import React, { memo } from 'react'

// Components
import { View, Text, FlatList, StatusBar, ScrollView } from 'react-native'
import BubbleTransition from './BubbleTransition'
import PostItem from './PostItem'
import Header from './Header'

// Helpers
import usePosts from './usePosts'

// Constants
import { font, color } from '@constants'

// Data
// import { posts } from './data'


export default memo(() => {

    // console.log(JSON.stringify(posts, null, 4))

    const [posts, fetchMore, postsResult] = usePosts({
        first: 5,
    });

    // console.log('---posts2:', JSON.stringify(posts, null, 4));

    if (postsResult.loading || postsResult.error) {
        return null;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>

            <StatusBar barStyle='light-content' />

            <FlatList
                data={posts.edges}
                contentContainerStyle={{
                    paddingBottom: 30,
                    // flexGrow: 1,
                }}
                pagingEnabled
                // ListHeaderComponent={(
                //     <Header title='New posts' />
                // )}
                keyExtractor={({ node }) => node.id}
                renderItem={({ item }) => (
                    <PostItem
                        item={item.node}
                    />
                )}
            />

            {/* <ScrollView>
                <Text>
                    {JSON.stringify(posts, null, 4)}
                </Text>
            </ScrollView> */}

            {/* <Text style={{
                fontFamily: font.black,
                color: color.primary,
                fontSize: 20,
            }}>
                Home
            </Text> */}
        </View>
    )
})