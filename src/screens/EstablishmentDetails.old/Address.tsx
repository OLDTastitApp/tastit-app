// React
import React, { memo } from 'react'

// Components
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { font, color } from '@constants'


export default memo((props: Props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Adresse
            </Text>
            <View style={styles.footer}>
                <FontAwesome5
                    color={color.dark}
                    name='map-marker-alt'
                    size={18}
                />
                <View>
                    <Text style={styles.description}>
                        {props.value}
                    </Text>
                    {/* <Text style={styles.description}>
                        75007 Paris, FRANCE
                    </Text> */}
                </View>
            </View>
            <View style={styles.separator} />
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginTop: 10,
    },
    title: {
        fontFamily: font.bold,
        color: color.dark,
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 10,
    },
    description: {
        fontFamily: font.regular,
        color: color.dark,
        marginLeft: 10,
        fontSize: 12,
    },
    separator: {
        backgroundColor: '#dadada',
        marginTop: 10,
        height: 1,
    },
})

// Types
type Props = {
    value: string,
}