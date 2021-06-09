// React
import React, { memo, useState, useRef, useEffect, useCallback } from 'react'

// Components
import { View, Animated, ScrollView, LayoutAnimation, StyleSheet } from 'react-native'
import Header from './Header'


export default memo((props: Props) => {

    // const onFocus: () => 
    const [value, setValue] = useState<string>();
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(false);
    const { current: progress } = useRef(new Animated.Value(0));

    // useEffect(
    //     () => {
    //         if (focused) {
    //             setVisible(true);
    //         }

    //         Animated.spring(progress, {
    //             toValue: +focused,
    //             useNativeDriver: true,
    //         }).start(() => {
    //             if (!focused) {
    //                 setVisible(false);
    //             }
    //         });
    //     },
    //     [focused]
    // );

    const onBackPress = () => {
        props.onBackPress();        
    };

    const onFocus = useCallback(
        () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setFocused(true);
        },
        []
    );

    const onBlur = useCallback(
        () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setFocused(false);
        },
        []
    );

    return (
        <View
            style={[StyleSheet.absoluteFill, { flex: 1 }]}
            pointerEvents='box-none'
        >
            {focused && (
                <Animated.View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'white',
                }}>

                </Animated.View>
            )}

            <Header
                onBackPress={onBackPress}
                onFocus={onFocus}
                onBlur={onBlur}
            />

            {focused && (
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    style={{
                    // backgroundColor: 'blue',
                    // flex: 1,
                }}>
                    <View style={{
                        backgroundColor: 'purple',
                        height: 100,
                    }} />
                </ScrollView>
            )}
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    background: {

    },
})

// Types
export type Props = {
    // ...
    onBackPress: () => void,
}