// React
import React, { memo } from 'react'

// Components
import { View, Image, Text, StyleSheet } from 'react-native'
import { TouchableScale, PicturePicker } from '@components'

// Constants
import { font, color } from '@constants'

// Types
import { User } from '@types'


export default memo((props: Props) => {

    const { user, onPress } = props;

    return (
        <View style={styles.wrapper}>

            <TouchableScale
                style={styles.container}
                onPress={onPress}
            >
                
                {/* <Image
                    source={{ uri: user.pictureUri }}
                    style={styles.picture}
                /> */}
                <PicturePicker
                    // uri={user.pictureUri}
                    uri={user.cover?.value}
                    disabled
                />

                <Text
                    style={styles.name}
                    numberOfLines={1}
                >
                    {user.firstName}
                </Text>
                
                <Text
                    style={styles.username}
                    numberOfLines={1}
                >
                    {/* @paultest */}
                    @{user.firstName.toLocaleLowerCase()}{user.lastName.toLocaleLowerCase()}
                </Text>

                <Text style={styles.description}>
                    « {user.biography} »
                </Text>
            </TouchableScale>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
    },
    container: {
        // backgroundColor: 'white',
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingBottom: 10,
    },
    picture: {
        borderRadius: 90,
        height: 90,
        width: 90,
    },
    name: {
        fontFamily: font.semiBold,
        textAlign: 'center',
        color: color.dark,
        marginTop: 10,
        fontSize: 26,
    },
    username: {
        fontFamily: font.regular,
        color: color.lightGray,
        textAlign: 'center',
        fontSize: 14,
    },
    description: {
        fontFamily: font.regular,
        color: color.darkGray,
        textAlign: 'center',
        marginTop: 10,
        fontSize: 12,
    },
})

// Types
type Props = {
    onPress: () => void,
    user: User,
}