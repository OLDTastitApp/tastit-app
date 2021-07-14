// React
import React, { memo } from 'react'

// Components
import { View, Image, Text, StyleSheet } from 'react-native'
import { TouchableScale, PicturePicker } from '@components'
import Feather from 'react-native-vector-icons/Feather'

// Constants
import { font, color } from '@constants'

// Types
import { User } from '@types'


export default memo((props: Props) => {

    const { user, onPress, myself } = props;

    return (
        <View style={styles.wrapper}>

            <TouchableScale
                style={styles.container}
                disabled={!myself}
                onPress={onPress}
            >
                
                {/* <Image
                    source={{ uri: user.pictureUri }}
                    style={styles.picture}
                /> */}
                <PicturePicker
                    // uri={user.pictureUri}
                    uri={user.picture?.url}
                    disabled
                />

                <Text
                    style={styles.name}
                    numberOfLines={1}
                >
                    {user.firstName} {user.lastName}
                </Text>
                
                <Text
                    style={styles.username}
                    numberOfLines={1}
                >
                    {/* @paultest */}
                    @{user.nickname}
                </Text>

                {!myself && (
                    <TouchableScale
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 10,
                            marginTop: 10,
                            // algin
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: color.primary,
                        }}
                    >
                        {!user.following && (
                            <Feather
                                style={{
                                    marginRight: 5,
                                }}
                                name='check'
                                color={color.primary}
                                size={14}
                            />
                        )}

                        <Text style={{
                            fontFamily: 'Avenir Next',
                            fontWeight: 'bold',
                            // color: color.dark,
                            color: color.primary,
                            fontSize: 14,
                        }}>
                            {!user.following ? `Abonné` : `S'abonner`}
                        </Text>
                    </TouchableScale>
                )}
            </TouchableScale>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    wrapper: {
        // backgroundColor: 'white',
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
    myself?: boolean,
    user: User,
}