// React
import React, { memo } from 'react'

// Components
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'

// Utils
import moment from 'moment'

// Constants
import { color, font } from '@constants'

// Types
import { Post } from '@types'


export default memo((props: Props) => {

    const { item } = props;
    const { user } = item;

    const createdAt = moment(item.createdAt).fromNow();

    const liked = Math.random() > 0.5;

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image
                    source={{ uri: user.pictureUri }}
                    style={styles.avatar}
                />
                
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <Text style={styles.name}>
                        {user.firstName} {user.lastName}
                    </Text>
                    <Text style={styles.position}>
                        {item.position.name}
                    </Text>
                </View>
                
                <Text style={styles.date}>
                    {createdAt}
                </Text>
            </View>

            <Text style={styles.description}>
                {item.description}
            </Text>

            <View style={{ borderRadius: 10, overflow: 'hidden' }}>
                <Image
                    source={{ uri: item.pictureUris?.[0] }}
                    style={styles.picture}
                />
                <LinearGradient
                    colors={['#000', 'transparent']}
                    end={{ x: 0.5, y: 0.5 }}
                    style={styles.gradient}
                    start={{ x: 1, y: 0 }}
                />
                <TouchableOpacity
                    style={styles.like}
                >
                    <FontAwesome
                        name={`heart${liked ? '' : '-o'}`}
                        // color={color.primary}
                        color='white'
                        size={30}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={{
                        backgroundColor: color.primary,
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 50,
                    }}
                >
                    <Text style={{
                        fontFamily: font.bold,
                        color: 'white',
                        fontSize: 16,
                    }}>
                        Place
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 2,
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        // marginHorizontal: é
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 50,
        height: 50,
        width: 50,
    },
    name: {
        fontFamily: font.bold,
        color: color.dark,
        fontSize: 12,
    },
    position: {
        fontFamily: font.regular,
        color: color.lightGray,
        fontSize: 12,
    },
    date: {
        fontFamily: font.regular,
        color: color.lightGray,
        fontSize: 12,
    },
    description: {
        fontFamily: font.regular,
        marginVertical: 10,
        color: color.dark,
        fontSize: 14,
    },
    picture: {
        borderRadius: 10,
        height: 350,
    },
    gradient: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    like: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 60,
        width: 60,
        right: 5,
        top: 5,
    },
    footer: {
        // justifyContent: 'flex-end',
        justifyContent: 'center',
        marginHorizontal: 20,
        flexDirection: 'row',
        marginTop: 10,
    },
})

// Types
type Props = {
    item: Post,
}