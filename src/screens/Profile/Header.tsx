// React
import React, { memo } from 'react'

// Components
import { View, Animated, Text, Image, StatusBar, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

import SendIcon from '@assets/icons/send.svg'

// Constants
import { ui } from '@constants'


export default memo((props: Props) => {

    return (
        <View>
            <StatusBar barStyle='light-content' />

            <View>
                <Image
                    source={{ uri: coverUrl }}
                    style={styles.cover}
                />

                <Image
                    style={[styles.cover, StyleSheet.absoluteFill, { opacity: 0.9 }]}
                    source={{ uri: coverUrl }}
                    blurRadius={80}
                />

                <Image
                    source={{ uri: userUrl }}
                    style={styles.picture}
                />
            </View>

            <View style={{
                top: ui.safePaddingTop - 10,
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'red',
                alignItems: 'center',
                width: '100%',
            }}>
                <TouchableScale
                    style={[styles.back, {
                        width: 50,
                        height: 50,
                        // backgroundColor: 'blue',
                        marginHorizontal: 10,
                    }]}
                >
                    <Feather
                        name='arrow-left'
                        color='white'
                        size={30}
                    />
                </TouchableScale>

                <View style={{
                    // backgroundColor: 'red',
                    marginHorizontal: 20,
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: 'Avenir Next',
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 16,
                    }}
                        numberOfLines={1}
                    >
                        Raphael Hadjadj
                    </Text>

                    <Text style={{
                        fontFamily: 'Avenir Next',
                        fontWeight: '500',
                        opacity: 0.8,
                        color: 'white',
                        fontSize: 12,
                    }}
                        numberOfLines={1}
                    >
                        47 listes
                    </Text>
                </View>

                <TouchableScale
                    style={{
                        width: 50,
                        // backgroundColor: 'blue',
                        marginHorizontal: 10,
                        // marginRight: 30,
                    }}
                >
                    <SendIcon
                        fill='white'
                        height={26}
                        width={26}
                    />
                </TouchableScale>
            </View>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {

    },
    cover: {
        // width:
        height: 130,
        // height: 90,
    },
    picture: {
        position: 'absolute',
        borderRadius: 80,
        marginLeft: 20,
        height: 80,
        width: 80,
        bottom: -50,
        borderWidth: 3,
        borderColor: 'white',
    },
    back: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 50,
        padding: 10,
    },
})

// Types
type Props = {
    translateY: Animated.Value,
}

//#region URL
const coverUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
const userUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
//#endregion