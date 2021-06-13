// React
import React, { memo, useState, useRef, useEffect, useCallback } from 'react'

// Components
import { View, ScrollView, LayoutAnimation, StyleSheet, Keyboard } from 'react-native'
import Animated from 'react-native-reanimated'
import Background from './Background'
import Header from './Header'


export default memo((props: Props) => {

    const { animatedIndex } = props;

    // const onFocus: () => 
    const [searchText, setSearchText] = useState<string>();
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(false);

    const onBackPress = () => {
        if (!focused) {
            props.onBackPress();
        } else {
            Keyboard.dismiss();
            onBlur();
        }
    };

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    return (
        <View
            style={[StyleSheet.absoluteFill, { flex: 1 }]}
            pointerEvents='box-none'
        >
            <Background focused={focused} />

            <Header
                onBackPress={onBackPress}
                onFocus={onFocus}
                onBlur={onBlur}
                searchText={searchText}
                animatedIndex={animatedIndex}
                onSearchTextChanged={setSearchText}
                focused={focused}
            />

            {focused && (
                <ScrollView
                    // keyboardShouldPersistTaps='handled'
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
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
    },
})

// Types
export type Props = {
    // ...
    animatedIndex: Animated.SharedValue<number>,
    onBackPress: () => void,
}