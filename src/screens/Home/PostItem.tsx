// React
import React, { memo } from 'react'

// Components
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'

// Utils
import moment from 'moment'

// Constants
import { color, font } from '@constants'

// Types
import { Post } from '@types'


const { width, height } = Dimensions.get('window')

export default memo((props: Props) => {

    const { item } = props;
    const { author, place, picture, content} = item;

    // const createdAt = moment(item.createdAt).fromNow();

    // const liked = Math.random() > 0.5;

    const { firstName, lastName, cover } = item.author;

    const username = `@${firstName.toLocaleLowerCase()}${lastName.toLocaleLowerCase()}`;


    return (
        <View style={{
            backgroundColor: 'red',
            justifyContent: 'space-between',
            height,
        }}>
            <View style={StyleSheet.absoluteFill}>
                <Image
                    // source={{ uri: item.pictureUris?.[0] }}
                    source={{ uri: picture?.value }}
                    style={{ flex: 1 }}
                />
                <LinearGradient
                    colors={['#000', 'transparent']}
                    end={{ x: 0.8, y: 0.2 }}
                    style={styles.gradient}
                    start={{ x: 1, y: 0 }}
                />

                <View style={{
                    position: 'absolute',
                    right: 0,
                    top: 30,
                }}>
                    <TouchableOpacity
                        style={styles.like}
                    >
                        <FontAwesome
                            // name={`heart${liked ? '' : '-o'}`}
                            name={`heart`}
                            // color={color.primary}
                            color='white'
                            size={40}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.like}
                    >
                        <FontAwesome
                            name={`share`}
                            color='white'
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View />

            <View style={{
                // backgroundColor: 'red',
                // height: 50,
                // paddingBottom: 0,
                // marginHorizontal: 10,
            }}>
                <LinearGradient
                    colors={['#000', 'transparent']}
                    style={styles.gradient}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                />

                <View style={[styles.header, { paddingTop: 100 }]}>
                    <Image
                        // source={{ uri: user.pictureUri }}
                        source={{ uri: author.cover?.value }}
                        style={styles.avatar}
                    />
                    
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Text style={styles.name}>
                            {/* @{user.firstName}{user.lastName} */}
                            {username}
                        </Text>
                        <Text style={styles.position}>
                            At {place?.name}
                        </Text>
                    </View>
                </View>

                <Text style={styles.description}>
                    {/* {item.description} */}
                </Text>

                <View style={{ marginBottom: 70 }} />
            </View>

        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
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
        marginHorizontal: 10,
    },
    avatar: {
        borderRadius: 50,
        height: 50,
        width: 50,
    },
    name: {
        fontFamily: font.bold,
        color: color.light,
        fontSize: 14,
    },
    position: {
        fontFamily: font.black,
        // color: color.lightGray,
        color: color.primary,
        fontSize: 14,
    },
    date: {
        fontFamily: font.regular,
        color: color.lightGray,
        fontSize: 12,
    },
    description: {
        fontFamily: font.regular,
        marginVertical: 10,
        color: color.light,
        fontSize: 14,
        marginHorizontal: 10,
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
        // position: 'absolute',
        height: 60,
        width: 60,
        // right: 5,
        // top: 30,
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