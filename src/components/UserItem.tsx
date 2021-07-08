// React
import React, { memo } from 'react'

// Components
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View, Text, Image, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

// Constants
import { color, font } from '@constants'

// Types
import { User } from '@types'


export default memo((props: Props) => {

    const { item, selected } = props;

    const onPress = () => {
        props.onPress(item);
    };

    // console.log('cover: ', item.cover)

    return (
        <TouchableScale
            style={styles.container}
            activeScale={0.99}
            onPress={onPress}
        >
            {!!item.picture ? (
                <Image
                    source={{ uri: item.picture.url }}
                    style={styles.left}
                />
            ) : (
                <View style={styles.left}>
                    <Text style={styles.initials}>
                        {item.firstName?.[0]}
                        {item.lastName?.[0]}
                    </Text>
                </View>
            )}

            <Text
                style={styles.name}
                numberOfLines={1}
            >
                {item.firstName} {item.lastName}
            </Text>

            <MaterialIcons
                // color={selected ? color.primary : 'transparent'}
                // name='radio-button-checked'
                name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
                color={selected ? color.primary : color.lightGray}
                size={24}
            />
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        height: 40,
        width: 40,
    },
    initials: {
        textTransform: 'capitalize',
        fontFamily: 'Avenir Next',
        color: color.mediumGray,
        fontWeight: 'bold',
        fontSize: 18,
    },
    name: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '500',
        marginLeft: 20,
        fontSize: 16,
        flex: 1,
    },
})

// Types
export type Props = {
    onPress: (item: User) => void,
    selected: boolean,
    item: User,
}