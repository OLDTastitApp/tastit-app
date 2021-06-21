// React
import React, { memo } from 'react'

// Components
import { View, StatusBar, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

// Constants
import { ui } from '@constants'


export default memo((props: Props) => {

    return (
        <View style={styles.container}>

            <StatusBar barStyle='light-content' />
            
            <TouchableScale
                onPress={props.onBackPress}
                style={styles.back}
            >
                <Feather
                    name='arrow-left'
                    size={20}
                />
            </TouchableScale>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        top: ui.safePaddingTop + 10,
        position: 'absolute',
        width: '100%',
    },
    back: {
        // backgroundColor: '#ffffffbb',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 50,
        padding: 10,
    },
})

// Types
type Props = {
    onBackPress: () => void,    
}