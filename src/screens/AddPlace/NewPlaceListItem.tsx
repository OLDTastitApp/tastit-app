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
    return (
        <TouchableScale
            style={styles.container}
            onPress={props.onPress}
        >
            <View
                style={styles.thumbnail}
            >
                <Feather
                    color='white'
                    name='plus'
                    size={20}
                />
            </View>

            <Text style={styles.name}>
                Créer une liste
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
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
    },
    name: {
        fontFamily: 'Avenir Next',
        color: color.primary,
        fontWeight: '600',
        marginLeft: 10,
        fontSize: 18,
        flex: 1,
    },
})

// Types
export type Props = {
    onPress: () => void,
}