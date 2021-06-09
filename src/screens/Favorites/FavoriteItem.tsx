// React
import React, { memo } from 'react'

// Components
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
// import { FontAwesome } from '@expo/vector-icons'
import { TouchableScale, Rating } from '@components'

// Constants
import { font, color } from '@constants'

// Types
import { Establishment } from '@types'


export default memo((props: Props) => {

    const { item, /*liked*/ } = props;
    const onPress = () => {
        props.onPress?.(item);
    };

    // const pricing = [...Array(item.pricing || 3)].
    const pricing = ''.padStart(item.pricing || 3, '€');

    const reduced = Math.random() > 0.5;

    const count = item.ratingCount >= 100 ? '100+' : item.ratingCount;

    const liked = Math.random() > 0.3;
    
    return (
        <TouchableScale
            style={styles.container}
            activeScale={0.98}
            onPress={onPress}
        >
            <View style={styles.cover}>
                <Image
                    source={{ uri: item.coverUri }}
                    style={styles.image}
                />
                <LinearGradient
                    colors={['#000000', 'transparent']}
                    end={{ x: 0.5, y: 0.5 }}
                    style={styles.gradient}
                    start={{ x: 1, y: 0 }}
                />
            </View>

            <View style={styles.header}>
                <Text
                    style={styles.title}
                    numberOfLines={1}
                >
                    {item.name}
                </Text>

                <Text style={styles.pricing}>
                    {pricing}
                </Text>
            </View>

            <View style={styles.content}>
                <Rating value={item.rating} />
                <Text
                    style={styles.count}
                    numberOfLines={1}
                >
                    {count} ratings
                </Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.address}>
                    <View style={{ paddingRight: 5 }}>
                        <Feather
                            color={color.mediumGray}
                            name='map-pin'
                            size={12}
                        />
                    </View>
                    {item.address}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.bookmark}
            >
                <FontAwesome
                    name={`bookmark${liked ? '' : '-o'}`}
                    // color={color.primary}
                    color='white'
                    size={24}
                />
            </TouchableOpacity>

        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 2,
        marginVertical: 2,
        borderRadius: 10,
        padding: 5,
        flex: 1,
    },
    cover: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    image: {
        height: 200,
    },
    gradient: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
    },
    title: {
        fontFamily: font.semiBold,
        color: color.dark,
        fontSize: 14,
    },
    pricing: {
        fontFamily: font.light,
        color: color.dark,
        fontSize: 14,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    count: {
        color: color.lightGray,
        textAlign: 'right',
        marginLeft: 5,
        fontSize: 11,
        flex: 1,
    },
    footer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginVertical: 5,
    },
    address: {
        color: color.mediumGray,
        fontFamily: font.bold,
        fontSize: 11,
        flex: 1,
    },
    bookmark: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 40,
        width: 40,
        right: 5,
        top: 5,
    },
})

// Types
export type Props = {
    onPress: (item: Establishment) => void,
    item: Establishment,
    liked?: boolean,
}