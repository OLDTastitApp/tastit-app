// React
import React, { memo } from 'react'

// Components
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => {

    return (
        <>
            <StatusBar barStyle='dark-content' />

            <View style={styles.container}>

                <TouchableScale
                    onPress={props.onBackPress}
                >
                    <Feather
                        color={color.dark}
                        name='arrow-left'
                        size={26}
                    />
                </TouchableScale>

                {/* <Text style={styles.title}>
                    {props.title}
                </Text> */}

                {/* <View style={styles.right} /> */}

            </View>
        </>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: ui.safePaddingTop + 10,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
    },
})

// Types
type Props = {
    onBackPress: () => void,
}