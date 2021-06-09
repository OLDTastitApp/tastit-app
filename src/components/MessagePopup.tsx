// React
import React, { memo, useRef, useState, forwardRef, useImperativeHandle } from 'react'

// Components
import { View, Text, Animated, Modal, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import sendSource from '@assets/animations/send.json'
import Lottie from 'lottie-react-native'

// Constants
import { font, color } from '@constants'


export default memo(forwardRef<Ref, Props>((props, ref) => {

    const { current: progress } = useRef(new Animated.Value(0));
    const [visible, setVisible] = useState(false);
  
    const show = () => {
        setVisible(true);
        Animated.sequence([
            Animated.timing(progress, {
                useNativeDriver: true,
                duration: 300,
                toValue: 1,
            }),
            Animated.delay(1000),
            Animated.timing(progress, {
                useNativeDriver: true,
                duration: 300,
                toValue: 0,
            }),
        ]).start(() => {
            setVisible(false);
        });
    };
  
    useImperativeHandle(ref, () => ({ show }), []);
  
    const opacity = progress.interpolate({
        outputRange: [0, 1],
        inputRange: [0, 1],
    });
  
    const translateY = progress.interpolate({
        outputRange: [20, 0],
        inputRange: [0, 1],
    });
  
    return (
        <Modal
            animationType='none'
            visible={visible}
            transparent
        >
            <Animated.View
                style={[
                    styles.overlay,
                    { opacity: progress },
                ]}
            />

            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity,
                        transform: [{ translateY }],
                    }
                ]}
            >
                <View style={styles.content}>
                    {/* <AntDesign
                        color={color.primary}
                        name='checkcircleo'
                        size={50}
                    /> */}
                    <Lottie
                        source={sendSource}
                        style={{
                            height: 100,
                            // backgroundColor: 'red',
                            width: 100,
                        }}
                        loop={false}
                        autoPlay
                    />
                    {/* <Text style={styles.message}>
                        {props.message}
                    </Text> */}
                </View>
            </Animated.View>
        </Modal>
    )
}))
  
// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#00000033',
    },
    content: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
        minWidth: 150,
        padding: 20,
    },
    message: {
        fontFamily: font.bold,
        color: color.dark,
        marginTop: 20,
        fontSize: 16,
    },
})
  
export type Props = {
    message: string,
}
  
export type Ref = {
    show: () => void,
}