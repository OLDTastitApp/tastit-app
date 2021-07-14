// React
import React, { memo } from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { color } from '@constants'

// Types
import { StyleProp, ViewStyle } from 'react-native'


export default memo((props: Props) => {
    return (
        <View style={props.style}>
            <Text style={styles.tos}>
                En continuant, vous acceptez les {''}
                <Text
                    onPress={props.onTOSPress}
                    style={styles.link}
                >
                    Conditions d'utilisation
                </Text>
                {''} et {''}
                <Text
                    onPress={props.onPrivacyPolicyPress}
                    style={styles.link}
                >
                    Politique de confidentialité
                </Text>
                {''} de Tastit
            </Text>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    tos: {
        fontFamily: 'Avenir Next',
        color: color.mediumGray,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 20,
        fontSize: 12,
    },
    link: {
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        color: color.gray,
    },
})

// Types
export type Props = {
    onPrivacyPolicyPress: () => void,
    style?: StyleProp<ViewStyle>,
    onTOSPress: () => void,
}