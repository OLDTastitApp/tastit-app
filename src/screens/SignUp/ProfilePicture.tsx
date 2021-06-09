// React
import React, { useState, useRef } from 'react'

// Components
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'
import TextInput from './TextInput'

// Constants
import { color, font } from '@constants'

// Types
import { Ref as TextInputRef, Props as TextInputProps } from './TextInput'


export default ((props: Props) => {

    return (
        <TouchableScale
            style={styles.container}
            activeScale={0.98}
        >
            <View style={styles.placeholder}>
                <FontAwesome5
                    name='user-circle'
                    color='white'
                    size={60}
                />
            </View>
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    placeholder: {
        // backgroundColor: color.lightGray,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 130,
        marginBottom: 10,
        height: 130,
        width: 130,
    },
})

// Types
export type Props = {
    // onSubmitPress: (form: Form) => void,
    // onPrivacyPolicyPress: () => void,
    // onTOSPress: () => void,
}

// type Form = {
//     firstName: string,
//     lastName: string,
//     password: string,
//     email: string,
// }

// type OnNextPress = TextInputProps['onNextPress']