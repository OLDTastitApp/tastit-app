// React
import React, { memo } from 'react'

// Components
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Text, Image, FlatList, StyleSheet, useWindowDimensions } from 'react-native'

// Constants
import { font, color } from '@constants'

import { posts } from '../Home/data'


export default memo((props: Props) => {

    const { width } = useWindowDimensions();

    const w = (width - 2 * 8 - 2 * 2) / 2;

    return (
        <View style={styles.container}>
            {/* <FlatList
                data={posts}
                keyExtractor={({ id }) => id}
                numColumns={2}
                contentContainerStyle={{
                    paddingHorizontal: 8,
                }}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                    <View style={{
                        marginHorizontal: 2,
                        // width: w,
                        marginVertical: 2,
                        borderRadius: 5,
                    }}>
                        <Image
                            source={{ uri: item.pictureUris[0] }}
                            style={{
                                borderRadius: 5,
                                width: w,
                                height: 135,
                            }}
                        />
                    </View>
                )}
            /> */}
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 30,
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
        // marginLeft: 10,
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