// React
import React, { memo } from 'react'

// Components
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Image, Text, StyleSheet } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'

// Constants
import { font, color } from '@constants'


export default memo((props: Props) => {

    // const { name, recommendationCount } = props;
    // const { coverUri } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Your rating !
            </Text>

            <View style={{
                // backgroundColor: 'blue',
                // alignSelf: 'flex-start',
                // top: -10,
            }}>
                <AirbnbRating
                    // reviewColor={color.primary}
                    {...{
                        // reviewColor: 'transparent',
                        reviewColor: color.primary,
                        // reviewSize: 1,
                    }}
                    selectedColor={color.primary}
                    defaultRating={0}
                    size={30}
                    // starStyle={{

                    // }}
                />
            </View>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        // backgroundColor: 'red',
        marginBottom: 50,
        marginTop: 10,
    },
    title: {
        fontFamily: font.regular,
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
    // coverUri: string,
    // name: string,
}