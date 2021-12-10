// React
import React, { memo } from 'react'

// Components
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'
import Image from 'react-native-fast-image'

// Icons
import HeartFilledIcon from '@assets/icons/heart-filled.svg'
import HeartIcon from '@assets/icons/heart.svg'
import ShareIcon from '@assets/icons/share.svg'
import SendIcon from '@assets/icons/send.svg'

// Helpers
import { useWindowDimensions } from 'react-native'

// Utils
import moment from 'moment'

// Constants
import { color, font } from '@constants'

// Types
import { Post } from '@types'


// const { width, height } = Dimensions.get('window')

export default memo((props: Props) => {

    const { item, canLike, template } = props;
    const { place, picture, content} = item;

    // const createdAt = moment(item.createdAt).fromNow();

    // const liked = Math.random() > 0.5;

    // const { firstName, lastName, cover } = item.author;
    // const { firstName, lastName } = item.creator;
    const { creator } = item;

    // const username = `@${ creator?.firstName?.toLocaleLowerCase()}${creator?.lastName?.toLocaleLowerCase()}`;

    const { width, height } = useWindowDimensions();

    const onLikePress = () => {
        props.onLikePress(item);
    };

    const onSahrePress = () => {
        props.onSharePress(item);
    };

    const onCreatorPress = () => {
        props.onCreatorPress(item);
    };

    const onPlacePress = () => {
        props.onPlacePress(item);
    };

    const onDeletePress = () => {
        props.onDeletePress(item);
    };

    const liked = item.liked || !canLike;
    const LikeIcon = liked ? HeartFilledIcon : HeartIcon;

    // console.log(`*** item: ${JSON.stringify(item, null, 4)}`)

    return (
        <View style={[styles.container, { height }]}>
            <View style={StyleSheet.absoluteFill}>
                <Image
                    // source={{ uri: item.pictureUris?.[0] }}
                    source={item.pictureSource ?? { uri: item.picture?.url }}
                    style={{ flex: 1 }}
                    // style={{ width: '100%', height: '100%' }}
                />
                <LinearGradient
                    colors={['#0005', 'transparent']}
                    end={{ x: 0.3, y: 0.2 }}
                    style={styles.gradient}
                    start={{ x: 1, y: 0 }}
                />
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
                    disabled={!creator.id || template}
                    onPress={onCreatorPress}
                    style={styles.header}
                    activeScale={0.99}
                >
                    {creator.picture ? (
                        <Image
                            source={{ uri: creator.picture?.url }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatar}>
                            {/* <Text style={{ fontSize: 20 }}>
                                👽
                            </Text> */}
                            <FontAwesome5
                                name='user-circle'
                                color='white'
                                size={20}
                            />
                        </View>
                    )}

                    <Text style={styles.name}>
                        { creator?.firstName}
                    </Text>
                </TouchableScale>
                
                {!!item.place?.name && (
                    <TouchableOpacity
                        disabled={!item.place.id || template}
                        onPress={onPlacePress}
                        activeOpacity={1}
                    >
                        <Text style={styles.position}>
                            {item.place.name}
                        </Text>
                    </TouchableOpacity>
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
                    disabled={!canLike || template}
                    onPress={onLikePress}
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
                    disabled={template}
                    style={styles.like}
                    activeScale={0.99}
                >
                    <SendIcon
                        fill='white'
                        height={32}
                        width={32}
                    />
                </TouchableScale>

                {props.canDelete && (
                    <TouchableScale
                        onPress={onDeletePress}
                        disabled={template}
                        style={styles.like}
                        activeScale={0.99}
                    >
                        <Feather
                            name='trash-2'
                            color='white'
                            size={36}
                        />
                    </TouchableScale>
                )}
            </View>

        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
        // width: 200,
        // height,
        // height: '100%',
        // bottom: 50,
        // flex: 1,
        // width: '100%',
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
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
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
    onDeletePress: (item: Post) => void,
    onSharePress: (item: Post) => void,
    onPlacePress: (item: Post) => void,
    onLikePress: (item: Post) => void,
    canDelete?: boolean,
    template?: boolean,
    canLike?: boolean,
    item: Post,
}