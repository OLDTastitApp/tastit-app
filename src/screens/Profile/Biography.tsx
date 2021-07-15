// React
import React, { memo } from 'react'

// Components
import { View, Image, Text, StyleSheet } from 'react-native'
import { FollowButton, ProfileButton } from '@components'

// Helpers
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Constants
import { font, color } from '@constants'

// Types
import { User } from '@types'


export default memo((props: Props) => {

    const { user, myself } = props;

    const onFollowPress = () => {
        props.onFollowPress(!user.following);
    };

    const edges = useSafeAreaInsets();
    const marginTop = edges.top + 90;

    return (
        <>
            <View style={[styles.container, { marginTop }]}>

                <View style={styles.header}>
                    {myself ? (
                        <ProfileButton
                            onSettingsPress={props.onSettingsPress}
                            onEditPress={props.onEditPress}
                        />
                    ) : (
                        <FollowButton
                            following={!user.following}
                            onPress={onFollowPress}
                        />
                    )}
                </View>

                <Text style={styles.name}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    {user.firstName} {user.lastName}
                </Text>

                <Text style={styles.nickname}>
                    @{user.nickname}
                </Text>

                <View style={styles.separator} />

                <Text
                    style={styles.description}
                    numberOfLines={3}
                >
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </Text>

                <View style={styles.footer}>
                    <View style={styles.item}>
                        <Text style={styles.count}>
                            74
                        </Text>
                        <Text style={styles.title}>
                            Followers
                        </Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.count}>
                            389
                        </Text>
                        <Text style={styles.title}>
                            Following
                        </Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.count}>
                            18
                        </Text>
                        <Text style={styles.title}>
                            Listes
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.line} />
        </>
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
        borderTopWidth: 1,
        paddingTop: 20,
        marginTop: 20,
    },
    item: {
        alignItems: 'center',
        flex: 1,
    },
    count: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '600',
        fontSize: 24,
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
    onSettingsPress: () => void,
    onEditPress: () => void,
    myself?: boolean,
    user: User,
}