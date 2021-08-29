// React
import React, { useCallback } from 'react'

// Components
import { View, Text, ScrollView } from 'react-native'
import AuthBanner from './AuthBanner'
import PostItem from './PostItem';

// Utils
import Share from 'react-native-share'

// Helpers
import { useNavigation as useNavigationCore } from '@react-navigation/core'
import { useDislikePost, useLikePost, usePost, useStore } from '@helpers'
import { useNavigation, useRoute } from '@navigation/utils'

// Types
import { Post } from '@types'


export default function PostDetails() {

    const { params } = useRoute<'PostDetails'>();
    const navigation = useNavigation();

    const navigationCore = useNavigationCore();

    const { id } = params;

    const { authenticated, userId } = useStore();

    const [post, postResult] = usePost({ id: params.id });

    const [dislikePost, dislikePostResult] = useDislikePost();
    const [likePost, likePostResult] = useLikePost();

    const onCreatorPress = useCallback(
        (item: Post) => {
            navigation.navigate('Profile', { userId: item.creator.id });
        },
        []
    );

    const onSharePress = useCallback(
        (item: Post) => {
            Share.open({
                title: item.content.substr(0, 10) + '...',
                message: `Clic sur le lien suivant pour visualiser le post tastit://post/${item.id}`,
            });
        },
        []
    );

    const onLikePress = useCallback(
        async (item: Post) => {
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

    const onBackPress = () => {
        if (authenticated) {
            if (navigationCore.canGoBack()) {
                navigationCore.goBack();
            } else {
                navigation.navigate('BottomTab');
            }
        } else {
            navigation.navigate('AuthStack' as any);
        }
    };

    const onLogInPress = () => {
        navigation.navigate('AuthStack' as any);
    };

    const canGoBack = navigationCore.canGoBack();

    if (postResult.error || postResult.loading) return null;
    
    return (
        <>
            <PostItem
                // item={}
                canLike={post.creator.id !== userId}
                onCreatorPress={onCreatorPress}
                authenticated={authenticated}
                onSharePress={onSharePress}
                onLikePress={onLikePress}
                onBackPress={onBackPress}
                canGoBack={canGoBack}
                item={post}
            />

            {!authenticated && (
                <AuthBanner
                    onLogInPress={onLogInPress}
                />
            )}
        </>
        // <ScrollView>
        //     <Text>
        //         POST DETAILS
        //         {id}
        //     </Text>
        // </ScrollView>
    )
}