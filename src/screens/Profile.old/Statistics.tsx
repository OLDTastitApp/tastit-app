// React
import React, { memo } from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { font, color } from '@constants'

// Types
import { Me } from '@types'


export default memo((props: Props) => (
    <>
        <View style={styles.separator} />

        <View style={styles.container}>
            
            <View style={styles.item}>
                <Text
                    style={styles.title}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    Lists
                </Text>
                
                <Text style={styles.value}>
                    {props.listCount}
                </Text>
            </View>

            <View style={styles.item}>
                <Text
                    style={styles.title}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    Favorites
                </Text>
                
                <Text style={styles.value}>
                    {props.favoriteCount}
                </Text>
            </View>

            <View style={styles.item}>
                <Text
                    style={styles.title}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    Followers
                </Text>
                
                <Text style={styles.value}>
                    {props.followerCount}
                </Text>
            </View>
        </View>
    </>
))

// Styles
const styles = StyleSheet.create({
    separator: {
        // backgroundColor: color.lightGray,
        marginHorizontal: 20,
        // marginBottom: 10,
        // width: '100%',
        // marginTop: 5,
        height: 1,
    },
    container: {
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingBottom: 10,
        marginBottom: 4,
        paddingTop: 10,
    },
    item: {
        marginHorizontal: 5,
        flex: 1,
    },
    title: {
        fontFamily: font.semiBold,
        textAlign: 'center',
        color: color.dark,
        fontSize: 16,
    },
    value: {
        fontFamily: font.regular,
        textAlign: 'center',
        color: color.dark,
        marginTop: 5,
        fontSize: 16,
    },
})

// Types
type Props = {
    favoriteCount?: number,
    followerCount?: number,
    listCount?: number,
}