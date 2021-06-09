// React
import React, { memo, RefObject, forwardRef } from 'react'

// Components
import { View, Text, TextInput, StyleSheet } from 'react-native'

// Constants
import { color, font } from '@constants'

// Types
import { TextInputProps } from 'react-native'


export default memo(forwardRef<TextInput, Props>((props, ref) => {

    const { label, onNextPress, nextRef, ...inputProps } = props;

    const onSubmitEditing: Props['onSubmitEditing'] = event => {
        props.onSubmitEditing?.(event);
        onNextPress?.(nextRef);
    };

    return (
        <View style={styles.container}>

            <Text style={styles.label}>
                {label}
            </Text>

            <TextInput
                placeholderTextColor={color.lightGray}
                onSubmitEditing={onSubmitEditing}
                style={styles.input}
                autoCorrect={false}
                {...inputProps}
                ref={ref}
            />

        </View>
    )
}))

// Styles
const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginBottom: 10,
    },
    label: {
        // fontFamily: font.regular,
        fontFamily: 'Avenir Next',
        color: color.darkGray,
        // color: color.mediumGray,
        // fontWeight: 'bold',
        fontSize: 20,
    },
    input: {
        // fontFamily: font.semiBold,
        fontFamily: 'Avenir Next',
        // color: color.darkGray,
        color: color.darkGray,
        fontWeight: 'bold',
        // marginVertical: 5,
        // marginLeft: 10,
        fontSize: 18,

    },
})

// Types
export type Props = TextInputProps & {
    onNextPress?: (ref: NextRef) => void,
    nextRef?: NextRef,
    label: string,
}

export type NextRef = RefObject<{
    focus?: () => void,
}>

export type Ref = TextInput