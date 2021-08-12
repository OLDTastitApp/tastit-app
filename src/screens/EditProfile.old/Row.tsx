// React
import React from 'react'

// Components
import { View, Text, TextInput, StyleSheet } from 'react-native'

// Constants
import { font, color } from '@constants'

// Types
import { TextInputProps } from 'react-native'


export default (props: Props) => {

    const { label, onChanged, ...inputProps } = props;
    
    return (
        <View style={styles.container}>

            <Text style={styles.label}>
                {props.label}
            </Text>

            <TextInput
                placeholder={props.placeholder}
                onChangeText={onChanged}
                style={styles.value}
                value={props.value}
                {...inputProps}
            />

        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    label: {
        fontFamily: font.regular,
        color: color.darkGray,
        fontSize: 14,
        flex: 1,
    },
    value: {
        fontFamily: font.regular,
        color: color.dark,
        fontSize: 16,
        flex: 2,
    },
})

// Types
type Props = TextInputProps & {
    onChanged: (value: string) => void,
    label: string,
}