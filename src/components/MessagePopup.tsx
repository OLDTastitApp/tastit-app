// React
import React, { memo, useRef, useState, forwardRef, useImperativeHandle } from 'react'

// Components
import { View, Text, Animated, Modal, StyleSheet, Platform } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BlurView } from '@react-native-community/blur'
import sendSource from '@assets/animations/send.json'
import Lottie from 'lottie-react-native'

// Constants
import { font, color } from '@constants'


export default memo(forwardRef<Ref, Props>((props, ref) => {

    const { message } = props;

    const { current: progress } = useRef(new Animated.Value(0));
    const [visible, setVisible] = useState(false);
  
    const show = () => {
        return new Promise<void>(resolve => {
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
                resolve();
            });
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
                <BlurView
                    // blurType='chromeMaterialLight'
                    blurType={Platform.OS === 'ios' ? 'chromeMaterialLight' : 'light'}
                    style={styles.content}
                    // blurRadius={100}
                    blurRadius={25}
                >
                    <AntDesign
                        // color={color.primary}
                        // name='checkcircleo'
                        color={color.dark}
                        name='check'
                        size={30}
                    />
                    {/* <Lottie
                        source={sendSource}
                        style={{
                            height: 100,
                            // backgroundColor: 'red',
                            width: 100,
                        }}
                        loop={false}
                        autoPlay
                    /> */}
                    {!!message && (
                        <Text style={styles.message}>
                            {message}
                        </Text>
                    )}
                </BlurView>
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
        // backgroundColor: '#00000033',
        backgroundColor: '#00000011',
    },
    content: {
        backgroundColor: '#ffffffee',
        alignItems: 'center',
        borderRadius: 10,
        minWidth: 130,
        padding: 20,
    },
    message: {
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        color: color.dark,
        marginTop: 20,
        fontSize: 16,
    },
})
  
export type Props = {
    message?: string,
}
  
export type Ref = {
    show: () => Promise<void>,
}