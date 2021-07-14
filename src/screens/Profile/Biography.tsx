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
        <>
            <View style={styles.container}>

                <View style={{
                    justifyContent: 'flex-end',
                    // backgroundColor: '#f00e',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,

                    // alignItems: ''
                }}>
                    <TouchableScale
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // marginBottom: 10,
                            // marginTop: 10,
                            // algin
                            paddingHorizontal: 15,
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
        // marginTop: 60,
    },
    header: {
        backgroundColor: 'red',
        // width: ''
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
    onPress: () => void,
    myself?: boolean,
    user: User,
}