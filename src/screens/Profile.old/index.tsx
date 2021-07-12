// React
import React, { memo, useCallback, useState, useRef, useMemo } from 'react'

// Components
import { View, Text, FlatList, StatusBar } from 'react-native'
import PictureViewer from './PictureViewer'
import PictureItem from './PictureItem'
import Statistics from './Statistics'
import Biography from './Biography'
import NavBar from './NavBar'

// Helpers
import { useNavigation } from '@navigation/utils'
import useMyPosts from './useMyPosts'
import useMe from './useMe'

// Constants
import { ui, font, color, style } from '@constants'

// Data
import { user, pictures } from './data'

// Types
import { Ref as PictureViewerRef } from './PictureViewer'
import { Props as PictureItemProps } from './PictureItem'


export default memo(() => {

    const pictureViewerRef = useRef<PictureViewerRef>(null);
    const [visible, setVisible] = useState(false);

    const navigation = useNavigation();

    const [posts, fetchMorePosts, postsResult] = useMyPosts({ first: 10 });
    const [me, meResult] = useMe();

    const onSettingsPress = () => {
        navigation.navigate('Settings');
    };

    const onPicturePress = useCallback<OnPicturePress>(
        item => pictureViewerRef.current.show(item),
        []
    );

    const onBiographyPress = () => {
        navigation.navigate('EditProfile', { me });
    };

    const pictures = useMemo(
        () => posts?.edges?.map(({ node }) => node),
        [posts]
    );

    // if (!me?.user) return null;

    // if (meResult.loading) return null;

    // if (meResult.error) {
    //     console.log(meResult.error);
    //     return null;
    // }

    // console.log(postsResult.data?.me)
    // console.log(JSON.stringify(posts, null, 4))
    // console.log(postsResult.error)

    return (
        <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>

            <StatusBar barStyle='dark-content' />

            <FlatList
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
                            onAddUserPress={() => {}}
                            title='Profile'
                        />
                        {/* <Biography
                            onPress={onBiographyPress}
                            user={me?.user}
                        /> */}
                        <Statistics
                            favoriteCount={me?.favoriteCount}
                            followerCount={me?.followerCount}
                            listCount={me?.listCount}
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

            {/* <PictureViewer
                ref={pictureViewerRef}
                data={pictures ?? []}
            /> */}

        </View>
    )
})

// Types
type OnPicturePress = PictureItemProps['onPress']