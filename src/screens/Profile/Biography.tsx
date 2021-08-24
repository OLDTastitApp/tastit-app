// React
import React, { memo, RefObject } from 'react'

// Components
import { View, Animated, Text, StyleSheet } from 'react-native'
import { FollowButton, ProfileButton } from '@components'

// Helpers
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Constants
import { font, color } from '@constants'

// Types
import { User } from '@types'


export default memo((props: Props) => {

    const { user, myself, onHeightChanged } = props;

    const onFollowPress = () => {
        props.onFollowPress(!user.following);
    };

    const edges = useSafeAreaInsets();
    const marginTop = edges.top + 90;

    const onLayout: View['props']['onLayout'] = event => {
        const { height } = event.nativeEvent.layout;
        // heightRef.current?.setValue(height);
        onHeightChanged(height);
    };

    return (
        <View onLayout={onLayout}>
            <View style={[styles.container, { marginTop }]}>

                <View style={styles.header}>
                    {myself ? (
                        <ProfileButton
                            onSettingsPress={props.onSettingsPress}
                            onEditPress={props.onEditPress}
                        />
                    ) : (
                        <FollowButton
                            following={user.following}
                            onPress={onFollowPress}
                        />
                    )}
                </View>

                <Text style={styles.name}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    {user?.firstName} {user?.lastName}
                </Text>

                <Text style={styles.nickname}>
                    @{user?.nickname}
                </Text>

                {!!user?.biography && (
                    <>
                        <View style={styles.separator} />

                        <Text
                            style={styles.description}
                            numberOfLines={3}
                        >
                            {user.biography}
                        </Text>
                    </>
                )}

                <View style={styles.footer}>
                    <View style={styles.item}>
                        <Text style={styles.count}>
                            {user?.followerCount}
                        </Text>
                        <Text style={styles.title}>
                            Followers
                        </Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.count}>
                            {user?.followingCount}
                        </Text>
                        <Text style={styles.title}>
                            Following
                        </Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.count}>
                            {user?.placeListCount}
                        </Text>
                        <Text style={styles.title}>
                            Listes
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.line} />
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    header: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    name: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '600',
        fontSize: 22,
        width: '60%',
    },
    nickname: {
        fontFamily: 'Avenir Next',
        color: color.mediumGray,
        fontWeight: '500',
        marginTop: 5,
        fontSize: 16,
    },
    separator: {
        backgroundColor: color.gray,
        marginVertical: 20,
        width: 60,
        height: 1,
    },
    description: {
        fontFamily: 'Avenir Next',
        color: color.gray,
        fontWeight: '500',
        fontSize: 16,
    },
    footer: {
        borderTopColor: '#eee',
        flexDirection: 'row',
        // borderTopWidth: 1,
        // paddingTop: 20,
        // marginTop: 20,
        marginTop: 16,
    },
    item: {
        // alignItems: 'center',
        // flex: 1,
        marginRight: 20,
    },
    count: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '600',
        // fontSize: 24,
        fontSize: 14,
    },
    title: {
        fontFamily: 'Avenir Next',
        color: color.mediumGray,
        fontWeight: '500',
        fontSize: 14,
    },
    line: {
        backgroundColor: '#eee',
        marginTop: 20,
        height: 1,
    }
})

// Types
type Props = {
    onFollowPress: (following: boolean) => void,
    onHeightChanged: (value: number) => void,
    // heightRef: RefObject<Animated.Value>,
    onSettingsPress: () => void,
    onEditPress: () => void,
    myself?: boolean,
    user: User,
}