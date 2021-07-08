// React
import React, { memo } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import { Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { font } from '@constants'


export default memo((props: Props) => {
    return (
        <TouchableScale
            style={styles.container}
            onPress={props.onPress}
            activeScale={0.98}
        >
            <Feather
                name='settings'
                color='#00cec9'
                size={22}
            />

            <Text style={styles.title}>
                Gagnez du temps en activant la géolocalisation
            </Text>
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00cec911',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 10,
    },
    title: {
        fontFamily: font.regular,
        color: `#00cec9`,
        marginLeft: 20,
        fontSize: 16,
    },
})

// Types
type Props = {
    onPress: () => void,
}