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
import postSource0 from '@assets/images/posts/0.jpg'
import postSource1 from '@assets/images/posts/1.jpg'
import postSource2 from '@assets/images/posts/2.jpg'
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

    const template = posts?.edges?.length === 0;
    const edges = (template ? DEFAULT_POSTS : posts?.edges) as typeof posts['edges'];
    // posts.edges?.[0].node?.creator.picture.

    console.log(`*** me: ${JSON.stringify(me, null, 4)}`);

    return (
        <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>

            <StatusBar barStyle='light-content' />

            <FlatList
                // data={posts}
                refreshing={refreshing}
                onRefresh={onRefresh}
                // data={posts?.edges}
                data={edges}
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
                        template={template}
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

// Constants
const DEFAULT_POSTS = [
    {
        node: {
            content: `Je viens de découvrir ce merveilleux restaurant au coeur du 16e, le service était juste whaou!\nLe plat était délicieux et le cadre est très agréable ^^`,
            // picture: {
            //     url: 'https://images.pexels.com/photos/3838628/pexels-photo-3838628.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
            // },
            pictureSource: postSource0,
            place: {
                name: 'Au Vieux Paris',
            },
            creator: {
                firstName: 'Vanessa de tastit',
                picture: {
                    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
                },
            },
            liked: true,
            id: '0',
        },
    },
    {
        node: {
            content: `La création de liste se fait directement depuis les pages des restaurants ou des bars que vous retrouvez sur l'onglet "rechercher" ! Profitez-en 😉`,
            // picture: {
            //     url: 'https://images.pexels.com/photos/7218637/pexels-photo-7218637.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
            // },
            pictureSource: postSource1,
            place: {
                name: `Création d'une liste`,
            },
            creator: {
                firstName: 'Vanessa de tastit',
                picture: {
                    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
                },
            },
            liked: true,
            id: '1',
        },
    },
    {
        node: {
            content: `Cliquez sur la petite loupe pour découvrir la map interactive. Elle vous permettra de trouver l'établissement de votre choix !`,
            // picture: {
            //     url: 'https://images.pexels.com/photos/4871175/pexels-photo-4871175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            // },
            pictureSource: postSource2,
            place: {
                name: `Découvrir des nouveaux Restos`,
            },
            creator: {
                firstName: 'Vanessa de tastit',
                picture: {
                    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
                },
            },
            liked: true,
            id: '2',
        },
    },
];

// Types
type OnCreatorPress = PostItemProps['onCreatorPress']
type OnDeletePress = PostItemProps['onDeletePress']
type OnSharePress = PostItemProps['onSharePress']
type OnPlacePress = PostItemProps['onPlacePress']
type OnLikePress = PostItemProps['onLikePress']