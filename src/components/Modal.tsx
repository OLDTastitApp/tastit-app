// React
import React, { useState, useEffect, useRef, useCallback, memo } from 'react'

// Components
import { View, TouchableOpacity, Modal as RNModal, Animated, StyleSheet } from 'react-native'

// Types
import { PropsWithChildren } from 'react'


export default memo((props: Props) => {

    const [visible, setVisible] = useState(!!props.visible);

    const heightRef = useRef(300);

    const { current: translateY } = useRef(
        new Animated.Value(props.visible ? 0 : heightRef.current)
    );
    const { current: opacity } = useRef(
        new Animated.Value(+!!props.visible)
    );

    const onLayout = useCallback<OnLayout>(
        ({ nativeEvent: { layout } }) => {
            heightRef.current = layout.height;
        },
        []
    );
    
    // Handle animation on visibility change
    useEffect(
        () => {
            if (visible === props.visible) return;

            if (props.visible) {
                setVisible(true);
            }
            
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: !!props.visible ? 0 : heightRef.current,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: !!props.visible ? 1 : 0,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                if (!props.visible) {
                    setVisible(false);
                }
            });
        },
        [props.visible, visible]
    );

    const onClosePress = () => {
        Animated.spring(translateY, {
            toValue: heightRef.current,
            useNativeDriver: true,
        }).start();
        Animated.timing(opacity, {
            useNativeDriver: true,
            toValue: 0,
        }).start(() => {
            setVisible(false);
            props.onClose?.();
        });
    };

    if (!visible) return null;

    const { backgroundColor = '#1119' } = props;

    return (
        <RNModal
            onRequestClose={props.onClose}
            statusBarTranslucent
            animationType='none'
            visible={visible}
            transparent
        >
            <View style={StyleSheet.absoluteFill}>

                <Animated.View
                    pointerEvents='none'
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor,
                            opacity,
                        },
                    ]}
                />

                <TouchableOpacity
                    style={styles.backdrop}
                    onPress={onClosePress}
                    activeOpacity={1}
                />

                <Animated.View
                    onLayout={onLayout}
                    style={{
                        transform: [
                            { translateY },
                        ],
                    }}
                >
                    <View style={styles.footer} />
                    {props.children}
                </Animated.View>
            
            </View>
        </RNModal>
    )
})

// Styles
const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
    },
    footer: {
        backgroundColor: 'white',
        position: 'absolute',
        width: '100%',
        bottom: -200,
        height: 200,
    },
})

// Types
export type Props = PropsWithChildren<{
    backgroundColor?: string,
    onClose?: () => void,
    visible?: boolean,
}>

export type Ref = {
    dismiss: () => void,
    show: () => void,
}

type OnLayout = View['props']['onLayout']