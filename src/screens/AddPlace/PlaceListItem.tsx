// React
import React, { memo } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

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
            <View
                style={styles.thumbnail}
            >
                <Feather
                    color={color.mediumGray}
                    name='plus'
                    size={20}
                />
            </View>

            <Text style={styles.name}>
                {item.name}
            </Text>
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    thumbnail: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
    },
    name: {
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        color: color.dark,
        marginLeft: 10,
        fontSize: 18,
        flex: 1,
    },
})

// Types
export type Props = {
    onPress: (item: PlaceList) => void,
    item: PlaceList,
}