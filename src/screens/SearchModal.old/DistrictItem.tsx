// React
import React, { memo } from 'react'

// Components
import { View, Text, Image, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

// Constants
import mapSource from '@assets/images/map.png'
import { color, font } from '@constants'

// Types
import { District } from '@types'


export default memo((props: Props) => {

    const { item, selected, onRemovePress, onSelectPress } = props;

    const onPress = selected
        ? () => onRemovePress(item)
        : () => onSelectPress(item);

    return (
        <TouchableScale
            style={styles.container}
            activeScale={0.95}
            onPress={onPress}
        >

            <Image
                style={styles.image}
                source={mapSource}
            />
            
            <Text style={styles.name}>
                {item.name}
            </Text>

            <View
                style={[
                    styles.button,
                    selected && styles.selected,
                ]}
            >
                <Feather
                    name={selected ? 'minus' : 'plus'}
                    style={styles.icon}
                    color='white'
                    size={16}
                />
            </View>

        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 10,
        height: 100,
        width: 100,
    },
    image: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 10,
        left: 0,
        top: 0,
    },
    name: {
        fontFamily: font.regular,
        color: color.darkGray,
        marginHorizontal: 10,
        fontSize: 14,
        top: 10,
    },
    icon: {
        height: 16,
        width: 16,
    },
    button: {
        backgroundColor: color.dark,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 26,
        height: 26,
        width: 26,
        right: -6,
        top: -6,
    },
    selected: {
        backgroundColor: color.primary,
    },
})

// Types
export type Props = {
    onRemovePress: (item: District) => void,
    onSelectPress: (item: District) => void,
    selected: boolean,
    item: District,
}