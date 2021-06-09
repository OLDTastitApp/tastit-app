// React
import React, { memo } from 'react'

// Components
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Image, Text, StyleSheet } from 'react-native'

// Constants
import { font, color } from '@constants'


export default memo((props: Props) => {

    // const { name, recommendationCount } = props;
    const { coverUri } = props;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: coverUri }}
                style={{
                    height: 300,
                }}
            />
            {/* <Text style={styles.name}>
                {name}
            </Text>
            <View style={styles.footer}>
                <FontAwesome5
                    color={color.primary}
                    name='users'
                    size={18}
                />
                <Text style={styles.description}>
                    {recommendationCount} amis vous le recommande
                </Text>
            </View>
            <View style={styles.separator} /> */}
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 30,
        // marginTop: 20,
    },
    name: {
        fontFamily: font.bold,
        color: color.dark,
        fontSize: 18,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    description: {
        fontFamily: font.bold,
        color: color.dark,
        marginLeft: 10,
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
    // recommendationCount: number,
    coverUri: string,
    // name: string,
}