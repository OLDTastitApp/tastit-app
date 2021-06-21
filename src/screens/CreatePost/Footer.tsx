// React
import React, { memo } from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'
// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => {

    const { disabled, onSubmit } = props;
    
    return (
        <>
            <View style={styles.empty} />

            <TouchableScale
                style={[
                    styles.container,
                    disabled && styles.disabled,
                ]}
                disabled={disabled}
                onPress={onSubmit}
            >
                <Text style={styles.title}>
                    Publier
                </Text>
            </TouchableScale>
        </>
    )
})

// Styles
const styles = StyleSheet.create({
    empty: {
        flexGrow: 1,
    },
    container: {
        marginBottom: ui.safePaddingBottom + 10,
        // backgroundColor: color.primary,
        // paddingHorizontal: 30,
        // paddingVertical: 10,
        // alignSelf: 'center',
        // borderRadius: 50,
        marginHorizontal: 20,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 14,
    },
    disabled: {
        backgroundColor: color.lightGray,
    },
    title: {
        // fontFamily: font.semiBold,
        // color: 'white',
        // fontSize: 20,
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
    },
})

// Types
export type Props = {
    onSubmit: () => void,
    disabled?: boolean,
}