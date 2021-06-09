// React
import React from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { color } from '@constants'


export default (props: Props) => {

    const Icon = iconMap[props.family] || Feather;

    const style = props.focused
        ? styles.focused
        : styles.unfocused;
    
    return (
        <View style={styles.container}>
            <Icon
                name={props.icon}
                style={style}
                size={28}
            />
            {!!props.title && (
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={[
                        styles.title,
                        style,
                    ]}
                >
                    {props.title}
                </Text>
            )}
        </View>
    )
}

// Constants
const iconMap: IconMap = {
    Feather,
    Entypo,
}

// Styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 10,
    },
    unfocused: {
        color: '#ccc',
    },
    focused: {
        color: color.primary,
    },
})

// Types
export type Props = {
    family?: 'Feather' | 'Entypo',
    focused: boolean,
    title?: string,
    icon: string,
}

type Icon = typeof Feather

type IconMap = {
    [key: string]: Icon,
}