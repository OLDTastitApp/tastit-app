// React
import React, { memo } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import { View, StatusBar, StyleSheet, Text } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { font, ui, color } from '@constants'

// Types
import { StatusBarProps } from 'react-native'


export default memo((props: Props) => {

    const { barStyle = 'light-content' } = props;

    return (
        <>
            <View style={styles.container}>

                <StatusBar barStyle={barStyle} />
                
                <TouchableScale
                    onPress={props.onBackPress}
                    style={styles.left}
                >
                    <Feather
                        name='arrow-left'
                        size={30}
                    />
                </TouchableScale>

                <Text
                    adjustsFontSizeToFit
                    style={styles.title}
                    numberOfLines={1}
                >
                    Nouvelle publication
                </Text>

                <View style={styles.right} />
            </View>

            <View style={styles.separator} />
        </>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: ui.safePaddingTop,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: font.bold,
        textAlign: 'center',
        fontSize: 20,
        flex: 1,
    },
    left: {
        justifyContent: 'center',
        height: 50,
        width: 50,
    },
    right: {
        height: '100%',
        width: 50,
    },
    separator: {
        backgroundColor: `${color.lightGray}55`,
        marginHorizontal: 20,
        height: 1,
    },
})

// Types
type Props = {
    barStyle?: StatusBarProps['barStyle'],
    onBackPress: () => void,
}