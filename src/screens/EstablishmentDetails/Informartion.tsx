// React
import React, { memo } from 'react'

// Components
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { font, color } from '@constants'

// Types
import { Establishment } from '@types'
import { TouchableScale } from '@components'


export default memo((props: Props) => {

    // const { rating = 1, pricing = 4 } = props;
    const { item } = props;

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.title}>
                    {item.name}
                </Text>

                <View style={styles.rating}>
                    <Text style={styles.star}>
                        {item.rating.toFixed(0)}
                    </Text>
                    <MaterialIcons
                        color='white'
                        name='star'
                        size={10}
                    />
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.address}>
                    {item.address}
                </Text>

                <View style={styles.hours}>
                    <Text style={styles.status}>
                        Ouvert jusqu'à 23h00
                    </Text>
                    <Text style={styles.see}>
                        Voir tout
                    </Text>
                </View>

                <Text style={[styles.address, { marginTop: 5 }]}>
                    French food - Pizza - Bar
                </Text>

                <View style={styles.actions}>
                    <TouchableScale
                        style={styles.button}
                        activeScale={0.98}
                    >
                        <Feather
                            style={{ marginRight: 5 }}
                            color={color.primary}
                            name='phone'
                            size={14}
                        />
                        <Text style={{
                            color: color.primary,
                            fontFamily: font.semiBold,
                            fontSize: 14,
                        }}>
                            +33781331315
                        </Text>
                    </TouchableScale>
                    <TouchableScale
                        style={styles.button}
                        activeScale={0.98}
                    >
                        <Feather
                            style={{ marginRight: 5 }}
                            color={color.primary}
                            name='mail'
                            size={14}
                        />
                        <Text style={{
                            color: color.primary,
                            fontFamily: font.semiBold,
                            fontSize: 14,
                        }}>
                            contact@tastit.fr
                        </Text>
                    </TouchableScale>
                </View>
            </View>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    // --- 3

    // --- 2
    actions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.primary,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 10,
        marginRight: 10,
    },
    // --- 1
    content: {
        marginTop: 10,
        marginHorizontal: 20,
    },
    address: {
        color: `${color.darkGray}77`,
        fontFamily: font.regular,
        fontSize: 16,
    },
    hours: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    status: {
        textDecorationLine: 'underline',
        fontFamily: font.semiBold,
        color: color.primary,
        fontSize: 16,
    },
    see: {
        textDecorationLine: 'none',
        fontFamily: font.regular,
        color: color.dark,
        textAlign: 'right',
        marginLeft: 10,
        fontSize: 16,
        flex: 1,
    },
    // --- 0
    container: {
        // marginHorizontal: 30,
        marginBottom: 20,
        marginTop: 20,
    },
    header: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: font.regular,
        color: color.dark,
        marginRight: 10,
        fontSize: 20,
        flex: 1,
    },
    rating: {
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 30,
        height: 30,
        width: 30,
    },
    star: {
        fontFamily: font.semiBold,
        color: 'white',
        marginLeft: 2,
        fontSize: 10,
    },
})

// Types
type Props = {
    item: Establishment,
}