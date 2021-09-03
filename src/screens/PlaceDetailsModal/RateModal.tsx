// import React, { memo } from 'react'
// import { BlurView, VibrancyView } from '@react-native-community/blur'
// import { View, Text, StyleSheet } from 'react-native'
// import { AirbnbRating, Rating } from 'react-native-ratings'
// import { Modal, TouchableScale } from '@components'
// import { color } from '@constants'


// export default memo((props: Props) => {

//     const { visible } = props;

//     return null;

//     return (
//         <Modal
//             onClose={props.onCancel}
//             visible={visible}
//         >
//             <View
//                 style={{ height: '100%' }}
//                 // pointerEvents='box-none'
//             >
//                 <BlurView
//                     style={styles.container}
//                     blurType='light'
//                     // pointerEvents='box-only'
//                 />
//             </View>
//             {/* <View style={{ backgroundColor: 'white', ...StyleSheet.absoluteFillObject }} /> */}
//             <View style={{
//                 // backgroundColor: 'white',
//                 ...StyleSheet.absoluteFillObject,
//                 justifyContent: 'center',
//                 alignContent: 'center',
//                 // width
//             }}
//                 // pointerEvents='box-none'
//             >
//                 <View style={{
//                     backgroundColor: 'white',
//                     // alignItems: 'center',
//                     // alignSelf: 'center',
//                     marginHorizontal: 20,
//                     borderRadius: 20,
//                 }}>
//                     <Text style={{
//                         fontFamily: 'Avenir Next',
//                         marginTop: 20,
//                         marginHorizontal: 20,
//                         marginBottom: 30,
//                         fontWeight: '600',
//                         fontSize: 22,
//                     }}>
//                         Rédiger un avis
//                     </Text>
//                     <Rating
//                         // reviews={['Terrible', 'Bad', 'OK', 'Good', 'Very good']}
//                         onFinishRating={(value) => {
//                             console.log(`Value: ${value}`)
//                         }}
//                         // selectedColor={color.primary}
//                         // reviewColor={color.primary}
//                         // showRating={false}
//                         // defaultRating={3}
//                         // count={5}
//                         // size={36}
                        
//                     />

//                     <TouchableScale style={{
//                         backgroundColor: color.primary,
//                         marginHorizontal: 15,
//                         paddingHorizontal: 5,
//                         paddingVertical: 10,
//                         borderRadius: 10,
//                         marginBottom: 20,
//                         marginTop: 30,
//                     }}>
//                         <Text style={{
//                             fontFamily: 'Avenir Next',
//                             fontWeight: 'bold',
//                             marginHorizontal: 20,
//                             textAlign: 'center',
//                             color: color.light,
//                             fontSize: 18,
//                         }}>
//                             Laisser votre avis
//                         </Text>
//                     </TouchableScale>
//                 </View>
//             </View>
//         </Modal>
//     )
// })

// // Styles
// const styles = StyleSheet.create({
//     container: {
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         height: '100%',
//         // ...StyleSheet.absoluteFillObject,
//     },
// })

// // Types
// export type Props = {
//     onRate: (value: number) => void,
//     onCancel: () => void,
//     visible?: boolean,
// }

// React
import React, { memo, useState } from 'react'

// Components
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native'
import { BlurView } from '@react-native-community/blur'
// import { Modal, TouchableScale } from '@components'
import { TouchableScale } from '@components'
import { Rating } from 'react-native-ratings'

// Constants
import { color } from '@constants'


export default memo((props: Props) => {

    // const ratingRef = useRef();
    const [rating, setRating] = useState<number>();

    const { visible } = props;

    const onFinishRating = (value: number) => {
        setRating(value);
    };

    const onSubmitPress = () => {
        props.onSubmit(rating);
        setRating(undefined);
    };

    const onCancel = () => {
        props.onCancel();
        setRating(undefined);
    };

    // return null;
    const disabled = rating == null;

    return (
        <Modal
            visible={visible}
            // style={{
            //     backgroundColor: 'transparent',
            // }}
            transparent
            statusBarTranslucent
            animationType='fade'
        >
            <View pointerEvents='none'>
                <BlurView
                    style={styles.blur}
                    // blurType='light'
                    // blurType='chromeMaterialLight'
                    blurType='xlight'
                    // blurRadius={0.1}
                />
            </View>

            <Pressable
                style={styles.container}
                onPress={onCancel}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Laissez une note
                    </Text>

                    <Rating
                        ratingBackgroundColor={`${color.primary}33`}
                        onFinishRating={onFinishRating}
                        ratingColor={color.primary}
                        startingValue={0}
                        tintColor='#fff'
                        jumpValue={1}
                        type='custom'
                        minValue={1}
                    />

                    <TouchableScale
                        style={[
                            styles.submit,
                            disabled && styles.disabled,
                        ]}
                        onPress={onSubmitPress}
                        disabled={disabled}
                    >
                        <Text style={styles.send}>
                            Envoyer
                        </Text>
                    </TouchableScale>
                </View>
            </Pressable>
        </Modal>
    )
})

// Styles
const styles = StyleSheet.create({
    blur: {
        height: '100%',
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'green',
    },
    content: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 20,
    },
    title: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
        textAlign: 'center',
        color: color.dark,
        fontWeight: '600',
        marginBottom: 30,
        marginTop: 20,
        fontSize: 22,
    },
    submit: {
        backgroundColor: color.primary,
        marginHorizontal: 15,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 30,
    },
    disabled: {
        // backgroundColor: color.lightGray,
        backgroundColor: `${color.primary}33`,
    },
    send: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
        textAlign: 'center',
        color: color.light,
        fontWeight: '600',
        fontSize: 18,
    },
})

// Types
export type Props = {
    onSubmit: (value: number) => void,
    onCancel: () => void,
    visible?: boolean,
}