// React
import React, { memo } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import { View, StyleSheet } from 'react-native'

// Constants
import { color } from '@constants'


export default memo((props: Props) => {

    return (
        <View style={styles.container}>
            {ITEMS.map((item, i) => (
                <View key={i}>
                    <Feather
                        color={color.dark}
                        name={item.icon}
                        size={24}
                    />
                </View>
            ))}
        </View>
    )
})

// Constants
const ITEMS = [
    { icon: 'list' },
    { icon: 'users' },
    { icon: 'heart' },
]

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingVertical: 10,
        // height: 100,
    },
})

// Types
type Props = {
    onChange: (index: number) => void,
    index: number,
}