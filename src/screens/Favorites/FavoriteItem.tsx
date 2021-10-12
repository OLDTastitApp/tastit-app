// React
import React, { memo } from 'react'

// Components
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'
import Image from 'react-native-fast-image'

// Icons
import HeartFilledIcon from '@assets/icons/heart-filled.svg'
import HeartIcon from '@assets/icons/heart.svg'

// Constants
import { font, color } from '@constants'

// Types
import { Place } from '@types'


export default memo((props: Props) => {

    const { item } = props;
    const onPress = () => {
        props.onPress?.(item);
    };

    const onLikePress = () => {
        props.onLikePress(item);
    };

    const onMorePress = () => {
        props.onMorePress(item);
    };

    const LikeIcon = item.liked ? HeartFilledIcon : HeartIcon;
    
    return (
        <TouchableScale
            style={styles.container}
            activeScale={0.99}
            onPress={onPress}
        >
            <View style={styles.cover}>
                <Image
                    source={{ uri: item.cover.url }}
                    style={styles.image}
                />
            </View>

            <View style={styles.header}>
                <Text
                    style={styles.name}
                    numberOfLines={1}
                >
                    {item.name}
                </Text>

                <TouchableScale
                    onPress={onLikePress}
                    style={styles.icon}
                >
                    <LikeIcon
                        fill={color.primary}
                        height={20}
                        width={20}
                    />
                </TouchableScale>

                {!props.favorite && props.removable && (
                    <TouchableScale
                        onPress={onMorePress}
                        style={styles.icon}
                    >
                        <FontAwesome
                            // fill={color.primary}
                            color={color.primary}
                            name='dots-horizontal'
                            size={24}
                        />
                    </TouchableScale>
                )}
            </View>

            <Text
                style={styles.address}
                numberOfLines={1}
            >
                {item.address}
            </Text>

        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        paddingBottom: 10,
        marginBottom: 20,
        // borderRadius: 20,
        borderRadius: 10,
        flex: 1,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.06,
        shadowRadius: 9.11,

        elevation: 14,
    },
    cover: {
        // borderTopRightRadius: 20,
        // borderTopLeftRadius: 20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
    },
    image: {
        height: 200,
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 10,
    },
    name: {
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        color: color.dark,
        fontSize: 24,
        flex: 1,
    },
    icon: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    address: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 15,
        fontWeight: '500',
        color: '#999',
        marginTop: 5,
        fontSize: 14,
        flex: 1,
    },
})

// Types
export type Props = {
    onMorePress?: (item: Place) => void,
    onLikePress: (item: Place) => void,
    onPress: (item: Place) => void,
    removable?: boolean,
    favorite?: boolean,
    item: Place,
}