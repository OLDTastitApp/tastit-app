// React
import React, { memo } from 'react'

// Components
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableScale } from '@components'
import Feather from 'react-native-vector-icons/Feather'

// Icons
import HeartFilledIcon from '@assets/icons/heart-filled.svg'
import HeartIcon from '@assets/icons/heart.svg'
import ShareIcon from '@assets/icons/share.svg'
import SendIcon from '@assets/icons/send.svg'

// Utils
import moment from 'moment'

// Constants
import { color, font } from '@constants'

// Types
import { Post } from '@types'


const { width, height } = Dimensions.get('window')

export default memo((props: Props) => {

    const { item, canLike } = props;
    const { place, picture, content} = item;

    // const createdAt = moment(item.createdAt).fromNow();

    // const liked = Math.random() > 0.5;

    // const { firstName, lastName, cover } = item.author;
    // const { firstName, lastName } = item.creator;
    const { creator } = item;

    // const username = `@${ creator?.firstName?.toLocaleLowerCase()}${creator?.lastName?.toLocaleLowerCase()}`;

    const onLikePress = () => {
        props.onLikePress(item);
    };

    const onSahrePress = () => {
        props.onSharePress(item);
    };

    const onCreatorPress = () => {
        props.onCreatorPress(item);
    };

    const liked = item.liked || !canLike;
    const LikeIcon = liked ? HeartFilledIcon : HeartIcon;

    console.log(`liked: ${item.liked}`)

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <Image
                    // source={{ uri: item.pictureUris?.[0] }}
                    source={{ uri: item.picture?.url }}
                    style={{ flex: 1 }}
                />
                {/* <LinearGradient
                    colors={['#000f', 'transparent']}
                    end={{ x: 0.3, y: 0.2 }}
                    style={styles.gradient}
                    start={{ x: 1, y: 0 }}
                /> */}
            </View>

            {/* <View /> */}

            <View style={styles.bottom}>
                <LinearGradient
                    colors={['#000f', '#0000']}
                    style={styles.gradient}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0.6 }}
                />

                <TouchableScale
                    onPress={onCreatorPress}
                    style={styles.header}
                    activeScale={0.99}
                >
                    <Image
                        source={{ uri: creator.picture?.url }}
                        style={styles.avatar}
                    />

                    <Text style={styles.name}>
                        { creator?.firstName}
                    </Text>
                </TouchableScale>
                
                {!!item.place?.name && (
                    <Text style={styles.position}>
                        {item.place.name}
                    </Text>
                )}

                <Text
                    style={styles.content}
                    numberOfLines={3}
                >
                    {item.content}
                </Text>

                <View style={{ marginBottom: 70 }} />
            </View>

            <View style={{
                position: 'absolute',
                right: 10,
                top: 60,
            }}>
                <TouchableScale
                    onPress={onLikePress}
                    disabled={!canLike}
                    style={styles.like}
                    activeScale={0.99}
                >
                    <LikeIcon
                        fill={!liked ? 'white' : color.primary}
                        height={32}
                        width={32}
                    />
                </TouchableScale>
                
                <TouchableScale
                    onPress={onSahrePress}
                    style={styles.like}
                    activeScale={0.99}
                >
                    <SendIcon
                        fill='white'
                        height={32}
                        width={32}
                    />
                </TouchableScale>
            </View>

        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height,
    },
    header: {
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottom: {
        justifyContent: 'flex-end',
        // backgroundColor: 'green',
        flex: 1,
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
    content: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
        fontWeight: '600',
        marginBottom: 50,
        color: '#fffc',
        marginTop: 10,
        fontSize: 14,
    },
    position: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
        fontWeight: '700',
        color: 'white',
        marginTop: 10,
        fontSize: 16,
    },
    gradient: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    like: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
    },
})

// Types
export type Props = {
    onCreatorPress: (item: Post) => void,
    onSharePress: (item: Post) => void,
    onLikePress: (item: Post) => void,
    canLike?: boolean,
    item: Post,
}