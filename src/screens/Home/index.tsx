// React
import React, { memo, useState, useCallback } from 'react'

// Components
import { View, Text, FlatList, StatusBar, ScrollView } from 'react-native'
import CompleteProfile from '../CompleteProfile'
import PostItem from './PostItem'
import Header from './Header'

// Helpers
// import usePosts from './usePosts'
import { useUserId, usePosts, useLikePost, useDislikePost, useDeletePost, useMe } from '@helpers'
import { useNavigation } from '@navigation/utils'

// Utils
import Share from 'react-native-share'

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
    const [me, meResult] = useMe();
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

    const [deletePost, deletePostResult] = useDeletePost();

    const [dislikePost, dislikePostResult] = useDislikePost();
    const [likePost, likePostResult] = useLikePost();

    const onCreatorPress = useCallback<OnCreatorPress>(
        item => {
            navigation.navigate('Profile', { userId: item.creator.id });
        },
        []
    );

    const onSharePress = useCallback<OnSharePress>(
        item => {
            Share.open({
                title: item.content.substr(0, 10) + '...',
                message: `Clic sur le lien suivant pour visualiser le post tastit://post/${item.id}`,
            });
        },
        []
    );

    const onLikePress = useCallback<OnLikePress>(
        async item => {
            try {
                const { id: postId } = item;
                console.log(`onLikePress: ${postId}, liked(${item.liked})`)
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

    const onDeletePress = useCallback<OnDeletePress>(
        async item => {
            try {
                const { id: postId } = item;
                console.log(`onDeletePress: ${postId}`)
                await deletePost({ id: postId });
            } catch (e) {
                console.log(e);
            }
        },
        []
    );

    const onPlacePress = useCallback<OnPlacePress>(
        item => {
            navigation.navigate('PlaceDetails', { placeId: item.place?.id });
        },
        []
    );

    // const complete = me?.roles?.[0]?.complete;
    const complete = me?.roles?.[0]?.complete;
    // console.log(`*** complete: ${JSON.stringify(me, null, 4)}`);

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
                        // canLike={item.node.creator.id !== userId}
                        canDelete={item.node.creator.id === userId}
                        onCreatorPress={onCreatorPress}
                        onDeletePress={onDeletePress}
                        onPlacePress={onPlacePress}
                        onSharePress={onSharePress}
                        onLikePress={onLikePress}
                        item={item.node}
                        canLike
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

            <CompleteProfile
                visible={complete === false}
            />

        </View>
    )
})

// Types
type OnCreatorPress = PostItemProps['onCreatorPress']
type OnDeletePress = PostItemProps['onDeletePress']
type OnSharePress = PostItemProps['onSharePress']
type OnPlacePress = PostItemProps['onPlacePress']
type OnLikePress = PostItemProps['onLikePress']