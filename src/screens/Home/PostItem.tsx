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

    // const { firstName, lastName, cover } = item.author;
    // const { firstName, lastName } = item.creator;
    const { creator } = item;

    const username = `@${ creator?.firstName?.toLocaleLowerCase()}${creator?.lastName?.toLocaleLowerCase()}`;


    return (
        <View style={{
            backgroundColor: 'red',
            justifyContent: 'space-between',
            height,
        }}>
            <View style={StyleSheet.absoluteFill}>
                <Image
                    // source={{ uri: item.pictureUris?.[0] }}
                    source={{ uri: item.picture?.url }}
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

            {/* <View /> */}

            <View style={{
                // backgroundColor: 'red',
                // height: 50,
                // paddingBottom: 0,
                // marginHorizontal: 10,
                flex: 1,
                justifyContent: 'flex-end',
            }}>
                <LinearGradient
                    colors={['#000f', '#0000']}
                    style={styles.gradient}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0.6 }}
                />

                <View style={[styles.header, { paddingTop: 100 }]}>
                    <Image
                        // source={{ uri: user.pictureUri }}
                        source={{ uri: creator.picture?.url }}
                        style={styles.avatar}
                    />

                    <Text style={styles.name}>
                        { creator?.firstName}
                    </Text>
                </View>
                
                {!!item.place?.name && (
                    <Text style={styles.position}>
                        {item.place.name}
                    </Text>
                )}

                <View style={{
                    // marginLeft: 10,
                    // width: '90%',
                    marginTop: 10,
                    marginBottom: 50,
                    marginHorizontal: 20,
                }}>
                    <Text style={{
                        fontSize: 14,
                        color: '#fffc',
                        fontWeight: '600',
                        fontFamily: 'Avenir Next',
                    }} numberOfLines={3}>
                        {item.content}
                    </Text>
                </View>

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
        marginHorizontal: 20,
    },
    avatar: {
        borderRadius: 40,
        height: 40,
        width: 40,
    },
    name: {
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
    },
    position: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
        fontWeight: '700',
        color: 'white',
        marginTop: 10,
        fontSize: 16,
    },
    date: {
        fontFamily: font.regular,
        color: color.lightGray,
        fontSize: 12,
    },
    description: {
        fontFamily: font.regular,
        // marginHorizontal: 10,
        marginVertical: 10,
        color: color.light,
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
    onCreatorPress: (item: Post) => void,
    onSharePress: (item: Post) => void,
    onLikePress: (item: Post) => void,
    item: Post,
}