// React
import React, { memo } from 'react'

// Components
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { color, font } from '@constants'

// Types
import { Post } from '@types'


export default memo((props: Props) => {

    const { item, searchText } = props;

    const onPress = () => {
        props.onPress(item);
    };

    // console.log('cover: ', item.cover)
    const tag = item.tags?.find(tag => tag.startsWith(searchText));

    return (
        <TouchableScale
            style={styles.container}
            activeScale={0.98}
            onPress={onPress}
        >
            {!!item.picture ? (
                <Image
                    source={{ uri: item.picture?.url }}
                    style={styles.left}
                />
            ) : (
                <View style={styles.left} />
            )}

            <View style={styles.content}>
                <Text
                    style={styles.name}
                    numberOfLines={1}
                >
                    {/* <Text style={{ fontWeight: 'normal' }}>#</Text> */}
                    {/* {item.firstName} {item.lastName} */}
                    {/* HASHTAG */}
                    #{tag}
                </Text>
                <Text
                    style={styles.address}
                    numberOfLines={1}
                >
                    {/* @{item.content.substr(0, 30)} */}
                    {item.content}
                </Text>
            </View>
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        paddingHorizontal: 20,
        flexDirection: 'row',
        marginVertical: 5,
        // height: 100,
        alignItems: 'center',
        // flex: 1,
    },
    left: {
        backgroundColor: '#f8f8f8',
        borderRadius: 80,
        height: 60,
        width: 60,
    },
    content: {
        justifyContent: 'center',
        // backgroundColor: 'red',
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontFamily: font.regular,
        color: color.dark,
        fontSize: 16,
        // flex: 1,
    },
    address: {
        fontFamily: font.regular,
        color: color.darkGray,
        fontSize: 14,
    },
})

// Types
export type Props = {
    onPress: (item: Post) => void,
    searchText: string,
    item: Post,
}