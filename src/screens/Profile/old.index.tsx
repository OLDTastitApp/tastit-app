// React
import React, { memo, useCallback, useState, useRef, useMemo } from 'react'

// Components
import { View, Text, FlatList, StatusBar } from 'react-native'
import PictureViewer from './PictureViewer'
import PictureItem from './PictureItem'
import Statistics from './Statistics'
import Biography from './Biography'
import NavBar from './NavBar'
import Header from './Header'

// Helpers
import { useUser, useUserId, usePosts, useFollow, useUnfollow } from '@helpers'
import { useNavigation, useRoute } from '@navigation/utils'

// Constants
import { ui, font, color, style } from '@constants'

// Types
import { Ref as PictureViewerRef } from './PictureViewer'
import { Props as PictureItemProps } from './PictureItem'


export default memo(() => {

    const pictureViewerRef = useRef<PictureViewerRef>(null);
    const [visible, setVisible] = useState(false);

    const navigation = useNavigation();
    const { params } = useRoute<'Profile'>();

    // const [posts, fetchMorePosts, postsResult] = useMyPosts({ first: 10 });
    // const [me, meResult] = useMe();

    const meId = useUserId();
    const userId = params?.userId ?? meId;
    const myself = userId === meId;

    const [user, userResult] = useUser({ id: userId });

    const [unfollow, unfollowResult] = useUnfollow();
    const [follow, followResult] = useFollow();

    const onSettingsPress = () => {
        navigation.navigate('Settings');
    };

    const onPicturePress = useCallback<OnPicturePress>(
        item => pictureViewerRef.current.show(item),
        []
    );

    const [posts, postsResult] = usePosts({
        creatorId: userId,
        first: 10,
    });

    const onBiographyPress = () => {
        // navigation.navigate('EditProfile', { me });
    };

    // const pictures = useMemo(
    //     () => posts?.edges?.map(({ node }) => node),
    //     [posts]
    // );

    // if (!me?.user) return null;

    // if (meResult.loading) return null;

    if (userResult.error) {
        console.log(userResult.error);
        return null;
    }

    // console.log(postsResult.data?.me)
    // console.log(JSON.stringify(posts, null, 4))
    // console.log(postsResult.error)

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <FlatList
                keyExtractor={(item, i) => `${item}_${i}`}
                // contentContainerStyle={{
                //     paddingBottom: ui.safePaddingBottom + 80,
                //     paddingHorizontal: 2,
                // }}
                ListHeaderComponent={user && (
                    <>
                        <NavBar
                            onSettingsPress={onSettingsPress}
                            // onAddUserPress={() => {}}
                            myself={myself}
                            title='Profile'
                        />
                        <Biography
                            onPress={onBiographyPress}
                            myself={myself}
                            user={user}
                        />
                        <Statistics
                            favoriteCount={user?.followingCount}
                            followerCount={user?.followerCount}
                            listCount={user?.postCount}
                        />
                    </>
                )}
                renderItem={({ item, index }) => (
                    <PictureItem
                        onPress={onPicturePress}
                        item={item.node}
                        index={index}
                    />
                )}
                // data={pictures}
                // data={[]}
                data={posts?.edges}
                numColumns={3}
            />

            <Header />

            {/* <FlatList
                keyExtractor={(item, i) => `${item}_${i}`}
                contentContainerStyle={{
                    paddingBottom: ui.safePaddingBottom + 80,
                    backgroundColor: '#f2f2f2',
                    paddingHorizontal: 2,
                }}
                ListHeaderComponent={user && (
                    <>
                        <NavBar
                            onSettingsPress={onSettingsPress}
                            // onAddUserPress={() => {}}
                            myself={myself}
                            title='Profile'
                        />
                        <Biography
                            onPress={onBiographyPress}
                            myself={myself}
                            user={user}
                        />
                        <Statistics
                            favoriteCount={user?.followingCount}
                            followerCount={user?.followerCount}
                            listCount={user?.postCount}
                        />
                    </>
                )}
                renderItem={({ item, index }) => (
                    <PictureItem
                        onPress={onPicturePress}
                        item={item.node}
                        index={index}
                    />
                )}
                // data={pictures}
                // data={[]}
                data={posts?.edges}
                numColumns={3}
            /> */}

            {/* <PictureViewer
                ref={pictureViewerRef}
                data={pictures ?? []}
            /> */}

        </View>
    )
})

// Types
type OnPicturePress = PictureItemProps['onPress']