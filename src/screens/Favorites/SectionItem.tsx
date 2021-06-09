// React
import React, { memo } from 'react'

// Components
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

// Constants
import { font, color } from '@constants'

// Types
import { Favorite } from '@types'


export default memo((props: Props) => {

    const { item, index, selected } = props;
    const onPress = () => {
        props.onPress?.({ item, index });
    };
    
    return (
        <TouchableOpacity
            style={[
                styles.container,
                selected && styles.containerSelected,
            ]}
            activeOpacity={1}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.title,
                    selected && styles.titleSelected,
                ]}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
    },
    containerSelected: {
        backgroundColor: color.darkGray,
        // backgroundColor: color.primary,
    },
    title: {
        fontFamily: font.semiBold,
        // color: color.dark,
        color: color.darkGray,
        fontSize: 16,
    },
    titleSelected: {
        color: color.light,
    },
})

// Types
export type Props = {
    onPress: (event: ItemEvent) => void,
    selected?: boolean,
    item: Favorite,
    index: number,
}

export type ItemEvent = {
    item: Favorite,
    index: number,
}