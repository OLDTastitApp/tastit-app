// React
import React, { memo, useState, useEffect } from 'react'

// Components
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, StatusBar, StyleSheet, LayoutAnimation } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import HeartIcon from '@assets/images/heart.svg'
import { TouchableScale } from '@components'

// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => {

    const [moreVisible, setMoreVisible] = useState(props.moreVisible);

    useEffect(
        () => {
            if (props.moreVisible !== moreVisible) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setMoreVisible(props.moreVisible);
            }
        },
        [props.moreVisible]
    );

    return (
        <>
            <StatusBar barStyle='dark-content' />

            <View style={styles.container}>

                {props.backVisible && (
                    <TouchableScale
                        onPress={props.onBackPress}
                        style={styles.back}
                    >
                        <Feather
                            name='arrow-left'
                            size={26}
                        />
                    </TouchableScale>
                )}

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

                {moreVisible && (
                    <TouchableScale
                        onPress={props.onMorePress}
                    >
                        {/* <MaterialCommunityIcons
                            color={color.darkGray}
                            name='share'
                            size={30}
                        /> */}
                        <Entypo
                            name='dots-three-horizontal'
                            color={color.dark}
                            // color='transparent'
                            size={20}
                        />
                    </TouchableScale>
                )}

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
    back: {
        justifyContent: 'center',
        marginRight: 10,
        height: 50,
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
    onBackPress?: () => void,
    onMorePress: () => void,
    backVisible?: boolean,
    moreVisible?: boolean,
    title: string,
}