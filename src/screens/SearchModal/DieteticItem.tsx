// React
import React, { memo } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import { Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { color } from '@constants'

// Types
import { Dietetic, Tag } from '@types'


export default memo((props: Props) => {

    const { item, selected, onRemovePress, onSelectPress } = props;

    const onPress = selected
        ? () => onRemovePress(item)
        : () => onSelectPress(item);

    return (
        <TouchableScale
            style={styles.container}
            activeScale={0.98}
            onPress={onPress}
        >
            {/* <item.Icon
                style={styles.icon}
                fill={color.dark}
                height={30}
                width={30}
            /> */}

            <Text
                adjustsFontSizeToFit
                style={styles.name}
                numberOfLines={1}
            >
                {item.name}
            </Text>

            {/* {selected && ( */}
                <Feather
                    color={selected ? color.dark : 'transparent'}
                    name='check'
                    size={20}
                />
            {/* )} */}
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    name: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        marginRight: 20,
        marginLeft: 15,
        fontSize: 16,
        flex: 1,
    },
    icon: {
        marginVertical: 10,
    },
})

// Types
export type Props = {
    onRemovePress: (item: Tag) => void,
    onSelectPress: (item: Tag) => void,
    selected: boolean,
    item: Tag,
}