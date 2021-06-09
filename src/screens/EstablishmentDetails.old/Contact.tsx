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
                Contact
            </Text>
            <View style={styles.footer}>
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    // backgroundColor: 'red',
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // flex: 1,
                    }}>
                        <MaterialIcons
                            color={color.dark}
                            name='call'
                            size={18}
                        />
                        <Text style={styles.description}>
                            +33 7 81 82 22 22
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // flex: 1,
                    }}>
                        <MaterialIcons
                            color={color.dark}
                            name='call'
                            size={18}
                        />
                        <Text style={styles.description}>
                            kozy@xxx.com
                        </Text>
                    </View>
                </View>
                <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // flex: 1,
                        marginTop: 5,
                    }}>
                        <FontAwesome5
                            color={color.dark}
                            name='globe-americas'
                            size={18}
                            style={{
                                marginRight: 3,
                            }}
                        />
                        <Text style={styles.description}>
                            Kozy.fr
                        </Text>
                    </View>
                {/* <View>
                    <Text style={styles.description}>
                        79 AVENUE BOSQUET
                    </Text>
                    <Text style={styles.description}>
                        75007 Paris, FRANCE
                    </Text>
                </View> */}
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
        // flexDirection: 'row',
        // alignItems: 'center',
        marginTop: 5,
        marginLeft: 10,
    },
    description: {
        fontFamily: font.regular,
        color: color.dark,
        marginLeft: 5,
        fontSize: 14,
    },
    separator: {
        backgroundColor: '#dadada',
        marginTop: 10,
        height: 1,
    },
})

// Types
type Props = {
    // ...
}