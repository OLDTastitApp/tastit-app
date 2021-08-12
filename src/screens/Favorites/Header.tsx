// React
import React, { memo } from 'react'

// Components
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import HeartIcon from '@assets/images/heart.svg'
import { TouchableScale } from '@components'

// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => {

    return (
        <>
            <StatusBar barStyle='dark-content' />

            <View style={styles.container}>

                <View style={styles.left}>
                    <HeartIcon
                        fill={color.light}
                        height={20}
                        width={20}
                    />
                </View>

                <Text style={styles.title}>
                    {props.title}
                </Text>

                <TouchableScale
                    // onPress={props.onSharePress}
                >
                    {/* <MaterialCommunityIcons
                        color={color.darkGray}
                        name='share'
                        size={30}
                    /> */}
                    <Entypo
                        name='dots-three-horizontal'
                        // color={color.dark}
                        color='transparent'
                        size={20}
                    />
                </TouchableScale>

            </View>
        </>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: ui.safePaddingTop + 10,
        backgroundColor: 'white',
        // backgroundColor: '#f8f8f8',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingBottom: 10,
    },
    left: {
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginRight: 10,
        height: 40,
        width: 40,
    },
    title: {
        // fontFamily: font.bold,
        fontFamily: 'Avenir Next',
        fontWeight: '700',
        color: color.dark,
        fontSize: 22,
        flex: 1,
    },
})

// Types
type Props = {
    // onSharePress: () => void,
    title: string,
}