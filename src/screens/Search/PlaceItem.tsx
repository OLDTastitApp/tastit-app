// React
import React, { memo } from 'react'

// Components
import { View, Text, Image, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

// Constants
import { color, font } from '@constants'

// Types
import { Place } from '@types'


export default memo((props: Props) => {

    const { item, removable } = props;

    const onPress = () => {
        props.onPress(item);
    };

    // console.log('cover: ', item.cover)

    return (
        <TouchableScale
            style={styles.container}
            activeScale={0.98}
            onPress={onPress}
        >
            <View style={removable && styles.removable}>
                {!!item.cover ? (
                    <Image
                        source={{ uri: item.cover?.url }}
                        style={[
                            styles.left,
                            removable && styles.border,
                        ]}
                    />
                ) : (
                    <View style={[
                        styles.left,
                        removable && styles.border,
                    ]} />
                )}
                {removable && (
                    <View style={[styles.overlay]}>
                        <Feather
                            color='white'
                            size={24}
                            name='x'
                        />
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text
                    style={styles.name}
                    numberOfLines={1}
                >
                    {/* <Text style={{ fontWeight: 'normal' }}>#</Text> */}
                    {item.name}
                </Text>
                <Text style={styles.address}>
                    {item.address}
                </Text>
            </View>
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    left: {
        backgroundColor: '#f8f8f8',
        borderRadius: 80,
        height: 60,
        width: 60,
    },
    border: {
        borderColor: 'white',
        borderWidth: 2,
    },
    removable: {
        backgroundColor: color.primary,
        borderRadius: 100,
        padding: 4,
    },
    overlay: {
        backgroundColor: '#0004',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 80,
        height: 56,
        width: 56,
        top: 6,
    },
    content: {
        justifyContent: 'center',
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontFamily: font.regular,
        color: color.dark,
        fontSize: 16,
    },
    address: {
        fontFamily: font.regular,
        color: color.darkGray,
        fontSize: 14,
    },
})

// Types
export type Props = {
    onPress: (item: Place) => void,
    removable?: boolean,
    item: Place,
}