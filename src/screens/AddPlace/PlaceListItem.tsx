// React
import React, { memo } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'
import Image from 'react-native-fast-image'

// Constants
import { color } from '@constants'

// Types
import { PlaceList } from '@types'


export default memo((props: Props) => {

    const { item } = props;

    const onPress = () => props.onPress(item);

    return (
        <TouchableScale
            style={styles.container}
            onPress={onPress}
        >
            {item.cover ? (
                <Image
                    source={{ uri: item.cover.url }}
                    style={styles.thumbnail}
                />
            ) : (
                <View
                    style={styles.thumbnail}
                >
                    <Feather
                        color={color.mediumGray}
                        name='plus'
                        size={20}
                    />
                </View>
            )}

            <View style={styles.content}>
                <Text style={styles.name}>
                    {item.name}
                </Text>

                <Text style={styles.description}>
                    {item.count} places
                </Text>
            </View>
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    thumbnail: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
    },
    content: {
        marginLeft: 15,
        flex: 1,
    },
    name: {
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        color: color.dark,
        fontSize: 20,
    },
    description: {
        fontFamily: 'Avenir Next',
        color: color.mediumGray,
        fontWeight: '500',
        marginTop: 5,
        fontSize: 14,
    }
})

// Types
export type Props = {
    onPress: (item: PlaceList) => void,
    item: PlaceList,
}