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
            
            <TouchableScale
                style={styles.button}
                onPress={onPress}
                hitSlop={hitSlop}
            >
                <ArrowLeftIcon
                    fill={color.dark}
                    height={20}
                    width={20}
                />
            </TouchableScale>

            <View style={{
                flexDirection: 'row',
                marginHorizontal: 15,
                marginTop: 15,
                // paddingHorizontal: 15,
                // paddingVertical: 15,
                backgroundColor: 'white',
                paddingLeft: 15,
                alignItems: 'center',
                borderRadius: 14,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.20,
                shadowRadius: 4.65,
                elevation: 8,
            }}>
                <SearchIcon
                    fill={color.dark}
                    height={20}
                    width={20}
                />
                <TextInput
                    // value={'AAAA'}
                    placeholder='Rechercher ...'
                    placeholderTextColor={color.mediumGray}
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        // backgroundColor: 'red',
                        color: color.dark,
                        fontSize: 16,
                        fontFamily: font.regular,
                        flex: 1,
                    }}
                />
            </View>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        top: ui.safePaddingTop + 10,
        position: 'absolute',
        // flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'red',
    },
    button: {
        alignSelf: 'flex-start',
        // marginLeft: 15,
        marginLeft: 20,
    },
})

// Types
type Props = {
    onSearchPress: () => void,
    onClosePress: () => void,
    onBackPress: () => void,
    focused?: boolean,
}