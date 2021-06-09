// React
import React, { memo, useState } from 'react'

// Components
import { BlurView } from '@react-native-community/blur'
import Feather from 'react-native-vector-icons/Feather'
import { View, TextInput, StatusBar, StyleSheet } from 'react-native'
import ArrowLeftIcon from '@assets/images/arrow-left.svg'
import SearchIcon from '@assets/images/search.svg'
import { TouchableScale } from '@components'

// Constants
import { ui, font, color, style, hitSlop } from '@constants'


export default memo((props: Props) => {

    // const { focused } = props;

    // const onPress = () => {
    //     if (focused) {
    //         props.onClosePress();
    //     } else {
    //         props.onBackPress();
    //     }
    // };

    return (
        <View style={styles.container}>

            <StatusBar translucent barStyle='dark-content' />
            
            <TouchableScale
                onPress={props.onBackPress}
                style={styles.button}
                hitSlop={hitSlop}
            >
                <ArrowLeftIcon
                    fill={color.dark}
                    height={20}
                    width={20}
                />
            </TouchableScale>

            <View style={styles.content}>
                <SearchIcon
                    fill={color.dark}
                    height={20}
                    width={20}
                />
                <TextInput
                    placeholderTextColor={color.mediumGray}
                    placeholder='Rechercher ...'
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    style={styles.input}
                />
            </View>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: ui.safePaddingTop + 10,
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
        // height: 180,
        // width: 100,
    },
    button: {
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    content: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        shadowColor: "#000",
        shadowOpacity: 0.20,
        shadowRadius: 4.65,
        borderRadius: 14,
        paddingLeft: 15,
        marginTop: 15,
        elevation: 8,
        shadowOffset: {
            height: 4,
            width: 0,
        },
    },
    input: {
        fontFamily: font.regular,
        paddingHorizontal: 15,
        paddingVertical: 15,
        color: color.dark,
        fontSize: 16,
        flex: 1,
    },
})

// Types
export type Props = {
    // onSearchPress: () => void,
    // onClosePress: () => void,
    // onBackPress: () => void,
    // focused?: boolean,

    onTextChanged: (value: string) => void,
    onBackPress: () => void,
    onFocus: () => void,
    onBlur: () => void,
}