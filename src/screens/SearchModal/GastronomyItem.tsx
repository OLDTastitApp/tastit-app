// React
import React, { memo } from 'react'

// Components
import { Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { color } from '@constants'

// Types
import { Gastronomy } from '@types'


export default memo((props: Props) => {

    const { item, selected, onRemovePress, onSelectPress } = props;

    const onPress = selected
        ? () => onRemovePress(item)
        : () => onSelectPress(item);

    return (
        <TouchableScale
            style={[
                styles.container,
                selected && styles.selected,
            ]}
            activeScale={0.98}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.name,
                    selected && styles.nameSelected,
                ]}
            >
                {item.name}
            </Text>
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: '#dedede',
        paddingHorizontal: 20,
        borderRadius: 100,
        borderWidth: 1,
        padding: 10,
        margin: 5,
    },
    selected: {
        backgroundColor: color.primary,
        borderColor: color.primary,
    },
    name: {
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        color: '#646e75',
        fontSize: 16,
    },
    nameSelected: {
        color: 'white',
    },
})

// Types
export type Props = {
    onRemovePress: (item: Gastronomy) => void,
    onSelectPress: (item: Gastronomy) => void,
    selected: boolean,
    item: Gastronomy,
}