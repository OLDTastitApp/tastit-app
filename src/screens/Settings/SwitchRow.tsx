// React
import React from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'
import { Switch } from '@components'

// Constants
import { font, color } from '@constants'


export default (props: Props) => (
    <View style={styles.container}>

        <Text style={styles.label}>
            {props.label}
        </Text>

        <Switch
            onChanged={props.onChanged}
            value={props.value}
        />

    </View>
)

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    label: {
        // fontFamily: font.regular,
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        color: color.dark,
        fontSize: 16,
        flex: 1,
    },
})

// Types
type Props = {
    onChanged: (value: boolean) => void,
    value: boolean,
    label: string,
}