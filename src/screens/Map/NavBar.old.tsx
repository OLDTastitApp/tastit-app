// React
import React, { memo, useState } from 'react'

// Components
import { BlurView } from '@react-native-community/blur'
import Feather from 'react-native-vector-icons/Feather'
import { View, StatusBar, StyleSheet } from 'react-native'
import ArrowLeft from '@assets/images/arrow-left.svg'
import Search from '@assets/images/search.svg'
import { TouchableScale } from '@components'


// Constants
import { ui, font, color, style } from '@constants'


export default memo((props: Props) => {

    const { focused } = props;

    const onPress = () => {
        if (focused) {
            props.onClosePress();
        } else {
            props.onBackPress();
        }
    };

    return (
        <View style={styles.container}>

            <StatusBar translucent barStyle='dark-content' />
            
            <BlurView
                style={styles.wrapper}
                blurRadius={100}
                blurType='light'
            >
                <TouchableScale
                    style={styles.button}
                    onPress={onPress}
                >
                    <Feather
                        name={focused ? 'x' : 'arrow-left'}
                        color={color.dark}
                        size={20}
                    />
                    {/* <ArrowLeft
                        fill={color.dark}
                        height={20 - 2}
                        width={20 - 2}
                    /> */}
                </TouchableScale>
            </BlurView>

            <BlurView
                style={styles.wrapper}
                blurRadius={100}
                blurType='light'
            >
                <TouchableScale
                    onPress={props.onSearchPress}
                    style={styles.button}
                >
                    {/* <Feather
                        name='search'
                        size={20}
                    /> */}
                    <Search
                        fill={color.dark}
                        height={20 - 2}
                        width={20 - 2}
                    />
                </TouchableScale>
            </BlurView>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        top: ui.safePaddingTop + 10,
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
    },
    wrapper: {
        marginHorizontal: 20,
        borderRadius: 25,
    },
    button: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        alignItems: 'center',
        height: 50,
        width: 50,
    },
})

// Types
type Props = {
    onSearchPress: () => void,
    onClosePress: () => void,
    onBackPress: () => void,
    focused?: boolean,
}