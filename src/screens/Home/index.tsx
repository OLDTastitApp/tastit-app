// React
import React, { memo, useState, useCallback } from 'react'

// Components
import { View, Text, FlatList, StatusBar, ScrollView } from 'react-native'
import PostItem from './PostItem'
import Header from './Header'

// Helpers
// import usePosts from './usePosts'
import { useUserId, usePosts, useLikePost, useDislikePost } from '@helpers'
import { useNavigation } from '@navigation/utils'

// Constants
import { font, color } from '@constants'

// Data
import { posts } from './data'
import { Post } from '@types'

// Types
import { Props as PostItemProps } from './PostItem'


export default memo(() => {

    // console.log(JSON.stringify(posts, null, 4))

    // const [posts, fetchMore, postsResult] = usePosts({
    //     first: 5,
    // });

    // console.log('---posts2:', JSON.stringify(posts, null, 4));

    // if (postsResult.loading || postsResult.error) {
    //     return null;
    // }

    const navigation = useNavigation();

    const userId = useUserId();
    // console.log(`userId: ${userId}`)
    const [posts, postsResult] = usePosts({ first: 10 });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await postsResult.refetch();
        } finally {
            setRefreshing(false);
        }
    };

    const [dislikePost, dislikePostResult] = useDislikePost();
    const [likePost, likePostResult] = useLikePost();

    const onCreatorPress = useCallback<OnCreatorPress>(
        item => {
            navigation.navigate('Profile', { userId: item.creator.id });
        },
        []
    );

    const onSharePress = useCallback<OnSharePress>(
        item => {},
        []
    );

    const onLikePress = useCallback<OnLikePress>(
        async item => {
            try {
                const { id: postId } = item;
                console.log(`onLikePress: ${postId}`)
                if (item.liked) {
                    await dislikePost({ postId });
                } else {
                    await likePost({ postId });
                }
            } catch (e) {
                console.log(e);
            }
        },
        []
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>

            <StatusBar barStyle='light-content' />

            <FlatList
                // data={posts}
                refreshing={refreshing}
                onRefresh={onRefresh}
                data={posts?.edges}
                // contentContainerStyle={{
                //     backgroundColor: 'red',
                //     paddingBottom: 30,
                //     // flexGrow: 1,
                // }}
                pagingEnabled
                // ListHeaderComponent={(
                //     <Header title='New posts' />
                // )}
                keyExtractor={({ node }) => node.id}
                // keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    <PostItem
                        canLike={item.node.creator.id !== userId}
                        onCreatorPress={onCreatorPress}
                        onSharePress={onSharePress}
                        onLikePress={onLikePress}
                        item={item.node}
                        // item={item}
                    />
                )}
            />

            {/* <ScrollView contentContainerStyle={{
                paddingTop: 100,
            }}>
                <Text>
                    {JSON.stringify({
                        posts: postsResult.error,
                        // posts,
                        // userId,
                    }, null, 4)}
                </Text>
            </ScrollView> */}

        </View>
    )
})

// Types
type OnCreatorPress = PostItemProps['onCreatorPress']
type OnSharePress = PostItemProps['onSharePress']
type OnLikePress = PostItemProps['onLikePress']