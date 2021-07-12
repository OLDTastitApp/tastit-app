// React
import React, { memo } from 'react'

// Components
import LinearGradient from 'react-native-linear-gradient'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'
import Image from 'react-native-fast-image'

// Types
import { Post } from '@types'


export default memo((props: Props) => {

    const { item } = props;
    const { creator } = item;

    return (
        <TouchableScale
            style={styles.container}
            disabled={true}
        >
            <Image
                source={{ uri: item.picture?.url }}
                style={styles.image}
            />

            <LinearGradient
                colors={['#000', 'transparent']}
                style={styles.gradient}
                // end={{ x: 0.8, y: 0.4 }}
                // start={{ x: 1, y: 0 }}
                end={{ x: 0.5, y: 0 }}
                start={{ x: 0, y: 1.5 }}
            />

            <View style={{
                position: 'absolute',
                // marginHorizontal:
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                bottom: 5,
            }}>
                <Image
                    source={{ uri: creator.picture?.url }}
                    style={{
                        borderRadius: 30,
                        marginLeft: 5,
                        height: 26,
                        width: 26,
                    }}
                />

                <Text
                    style={{
                        fontFamily: 'Avenir Next',
                        marginHorizontal: 5,
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 12,
                        flex: 1,
                    }}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    {creator?.firstName}
                </Text>
            </View>
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        overflow: 'hidden',
        borderRadius: 10,
    },
    image: {
        borderRadius: 10,
        height: 100,
        width: 150,
    },
    gradient: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
})

// types
type Props = {
    item: Post,
}