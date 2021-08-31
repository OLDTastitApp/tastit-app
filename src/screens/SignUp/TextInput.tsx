// React
import React, { memo, RefObject, forwardRef } from 'react'

// Components
import { View, Text, TextInput, StyleSheet } from 'react-native'

// Constants
import { color, font } from '@constants'

// Types
import { TextInputProps } from 'react-native'


export default memo(forwardRef<TextInput, Props>((props, ref) => {

    const { label, error, onNextPress, nextRef, ...inputProps } = props;

    const onSubmitEditing: Props['onSubmitEditing'] = event => {
        props.onSubmitEditing?.(event);
        onNextPress?.(nextRef);
    };

    return (
        <View style={styles.container}>

            {/* <Text
                style={[
                    styles.label,
                    error && styles.error,
                ]}
            >
                {label}
            </Text> */}

            <TextInput
                placeholderTextColor={color.mediumGray}
                onSubmitEditing={onSubmitEditing}
                style={styles.input}
                autoCorrect={false}
                {...inputProps}
                ref={ref}
            />

            {!!error && (
                <Text style={styles.message}>
                    {error}
                </Text>
            )}

            <View style={{
                // backgroundColor: color.mediumGray,
                backgroundColor: color.lightGray,
                // backgroundColor: '#eee',
                marginTop: 10,
                height: 1,
            }} />

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
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        color: color.dark,
        fontSize: 22,
    },
    input: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '500',
        fontSize: 18,
    },
    error: {
        color: color.primary,
    },
    message: {
        fontFamily: 'Avenir Next',
        color: color.primary,
        fontWeight: '500',
        fontSize: 12,
        marginTop: 5,
    },
})

// Types
export type Props = TextInputProps & {
    onNextPress?: (ref: NextRef) => void,
    nextRef?: NextRef,
    error?: string,
    label: string,
}

export type NextRef = RefObject<{
    focus?: () => void,
}>

export type Ref = TextInput