// React
import React, { memo } from 'react'

// Components
import { View, Text, Image, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

// Constants
import { font, color } from '@constants'

// Data
import { posts } from '../Home/data'

// Types
import { Establishment } from '@types'


export default memo((props: Props) => {

    // const { rating = 1, pricing = 4 } = props;
    const { item } = props;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: item.pictureUris[0] }}
                style={styles.image}
            />

            <LinearGradient
                colors={['#000', 'transparent']}
                style={styles.gradient}
                // start={{ x: 0, y: 0 }}
                // end={{ x: 0, y: 1 }}
                end={{ x: 0.4, y: 0.5 }}
                start={{ x: 0, y: 0 }}
            />

            <View style={{
                position: 'absolute',
                left: 10,
                top: 10,
            }}>
                <Image
                    style={{
                        backgroundColor: 'red',
                        borderRadius: 50,
                        height: 50,
                        width: 50,
                    }}
                    source={{ uri: item.user.pictureUri }}
                />
            </View>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // ..
        backgroundColor: 'red',
        marginHorizontal: 10,
        width: 1.5 * 140,
        height: 140,
    },
    image: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
})

// Types
export type Props = {
    item: Item,
}

type Item = typeof posts[0]