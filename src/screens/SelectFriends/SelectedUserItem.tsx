// React
import React, { memo } from 'react'

// Components
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Text, Image, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

// Constants
import { color, font } from '@constants'

// Types
import { User } from '@types'


export default memo((props: Props) => {

    const { item } = props;

    const onPress = () => {
        props.onPress(item);
    };

    return (
        <View style={styles.container}>
            {!!item.picture ? (
                <Image
                    source={{ uri: item.picture.url }}
                    style={styles.placeholder}
                />
            ) : (
                <View style={styles.placeholder}>
                    {/* <Text style={{ fontSize: 30 }}>
                        👽
                    </Text> */}
                    <FontAwesome5
                        name='user-circle'
                        color='white'
                        size={30}
                    />
                </View>
                // <View style={styles.placeholder}>
                //     <Text style={styles.initials}>
                //         {item.firstName?.[0]}
                //         {item.lastName?.[0]}
                //     </Text>
                // </View>
            )}

            <TouchableScale
                onPress={onPress}
                style={{
                    backgroundColor: color.primary,
                    justifyContent: 'center',
                    position: 'absolute',
                    alignItems: 'center',
                    borderRadius: 100,
                    height: 20,
                    width: 20,
                    right: 0,
                    top: 0,
                }}
            >
                <Feather
                    color='white'
                    size={14}
                    name='x'
                />
            </TouchableScale>

            <View style={styles.content}>
                <Text
                    adjustsFontSizeToFit
                    style={styles.name}
                    numberOfLines={1}
                >
                    {item.firstName}
                </Text>
            </View>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 5,
        width: 70,
    },
    // avatar: {
    //     backgroundColor: '#f2f2f2',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 40,
    //     height: 40,
    //     width: 40,
    // },
    placeholder: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        height: 60,
        width: 60,
    },
    // initials: {
    //     textTransform: 'capitalize',
    //     fontFamily: 'Avenir Next',
    //     color: color.mediumGray,
    //     fontWeight: 'bold',
    //     fontSize: 24,
    // },
    content: {
        justifyContent: 'center',
    },
    name: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '500',
        fontSize: 12,
        marginTop: 5,
    },
})

// Types
export type Props = {
    onPress: (item: User) => void,
    item: User,
}