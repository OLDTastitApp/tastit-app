// React
import React, { memo } from 'react'

// Components
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { font, color } from '@constants'


export default memo((props: Props) => {

    const { rating = 1, pricing = 4 } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Information
            </Text>

            <View style={styles.timetable}>
                <FontAwesome5
                    color={color.dark}
                    name='clock'
                    size={18}
                />
                <Text style={styles.description}>
                    <Text style={{ color: color.primary }}>
                        Ouvert
                    </Text>
                    {' '} Ferme à 23H
                </Text>
            </View>

            <View style={styles.footer}>
                {[...Array(Math.ceil(rating))].map((_, i) => (
                    <MaterialIcons
                        name='restaurant-menu'
                        color={color.dark}
                        size={18}
                        key={i}
                    />
                ))}
                <Text style={styles.price}>
                    {''.padEnd(Math.ceil(pricing), '€')}
                </Text>
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
    timetable: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 5,
    },
    description: {
        fontFamily: font.regular,
        color: color.dark,
        marginLeft: 10,
        fontSize: 14,
    },
    price: {
        fontFamily: font.regular,
        color: color.dark,
        marginLeft: 10,
        fontSize: 14,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 5,
        flex: 1,
    },
    separator: {
        backgroundColor: '#dadada',
        marginTop: 10,
        height: 1,
    },
})

// Types
type Props = {
    pricing: number,
    rating: number,
}