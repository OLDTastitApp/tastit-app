import React, { memo } from 'react'
import { BlurView, VibrancyView } from '@react-native-community/blur'
import { View, Text, StyleSheet } from 'react-native'
import { AirbnbRating, Rating } from 'react-native-ratings'
import { Modal, TouchableScale } from '@components'
import { color } from '@constants'


export default memo((props: Props) => {

    const { visible } = props;

    return (
        <Modal
            onClose={props.onCancel}
            visible={visible}
        >
            <View
                style={{ height: '100%' }}
                // pointerEvents='box-none'
            >
                <BlurView
                    style={styles.container}
                    blurType='light'
                    // pointerEvents='box-only'
                />
            </View>
            {/* <View style={{ backgroundColor: 'white', ...StyleSheet.absoluteFillObject }} /> */}
            <View style={{
                // backgroundColor: 'white',
                ...StyleSheet.absoluteFillObject,
                justifyContent: 'center',
                alignContent: 'center',
                // width
            }}
                // pointerEvents='box-none'
            >
                <View style={{
                    backgroundColor: 'white',
                    // alignItems: 'center',
                    // alignSelf: 'center',
                    marginHorizontal: 20,
                    borderRadius: 20,
                }}>
                    <Text style={{
                        fontFamily: 'Avenir Next',
                        marginTop: 20,
                        marginHorizontal: 20,
                        marginBottom: 30,
                        fontWeight: '600',
                        fontSize: 22,
                    }}>
                        Rédiger un avis
                    </Text>
                    <Rating
                        // reviews={['Terrible', 'Bad', 'OK', 'Good', 'Very good']}
                        onFinishRating={(value) => {
                            console.log(`Value: ${value}`)
                        }}
                        // selectedColor={color.primary}
                        // reviewColor={color.primary}
                        // showRating={false}
                        // defaultRating={3}
                        // count={5}
                        // size={36}
                        
                    />

                    <TouchableScale style={{
                        backgroundColor: color.primary,
                        marginHorizontal: 15,
                        paddingHorizontal: 5,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginBottom: 20,
                        marginTop: 30,
                    }}>
                        <Text style={{
                            fontFamily: 'Avenir Next',
                            fontWeight: 'bold',
                            marginHorizontal: 20,
                            textAlign: 'center',
                            color: color.light,
                            fontSize: 18,
                        }}>
                            Laisser votre avis
                        </Text>
                    </TouchableScale>
                </View>
            </View>
        </Modal>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        height: '100%',
        // ...StyleSheet.absoluteFillObject,
    },
})

// Types
export type Props = {
    onRate: (value: number) => void,
    onCancel: () => void,
    visible?: boolean,
}