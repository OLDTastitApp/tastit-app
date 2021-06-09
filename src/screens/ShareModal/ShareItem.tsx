// React
import React, { memo } from 'react'

// Components
import { View, Image, Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { font, color } from '@constants'

// Types
import { User } from '@types'


export default memo((props: Props) => {
    
    const { item } = props;

    const { firstName, lastName } = item;

    return (
        <TouchableScale
            onPress={() => props.onPress?.(item)}
            style={styles.container}
            activeScale={0.95}
        >
            <Image
                source={{ uri: item.pictureUri }}
                style={styles.picture}
            />

            <Text
                style={styles.name}
                numberOfLines={2}
            >
                {`${firstName} ${lastName}`}
            </Text>
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    picture: {
        borderRadius: 50,
        height: 50,
        width: 50,
    },
    name: {
        fontFamily: font.semiBold,
        color: color.darkGray,
        marginLeft: 10,
        fontSize: 16,
        flex: 1,
    },
})

// Types
type Props = {
    onPress: (item: User) => void,
    item: User,
}