// React
import React, { memo } from 'react'

// Components
import { View, TextInput, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

// Constants
import { font, color } from '@constants'


export default memo((props: Props) => {
    return (
        <View style={styles.container}>
            <Feather
                // color={color.darkGray}
                color={`${color.darkGray}77`}
                name='search'
                size={20}
            />
            <TextInput
                placeholderTextColor={`${color.darkGray}77`}
                placeholder='Rechercher par nom'
                onChangeText={props.onChange}
                style={styles.value}
                value={props.value}
                autoCorrect={false}
            />
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 50,
    },
    value: {
        fontFamily: font.semiBold,
        color: color.darkGray,
        textAlign: 'center',
        marginLeft: 10,
        fontSize: 16,
    },
})

// Types
type Props = {
    onChange: (value: string) => void,
    value: string,
}