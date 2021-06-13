// React
import React, { memo, useState, useRef, useEffect, useCallback } from 'react'

// Components
import { View, Text, ScrollView, StyleSheet, Keyboard } from 'react-native'
import Animated from 'react-native-reanimated'
import SectionHeader from './SectionHeader'
import Background from './Background'
import Header from './Header'

// Helpers
import { usePlaces } from '@helpers'


export default memo((props: Props) => {

    const { animatedIndex } = props;

    // const onFocus: () => 
    const [searchText, setSearchText] = useState<string>();
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(false);

    const empty = !(searchText?.length > 0);

    const onBackPress = () => {
        // const empty = !(searchText?.length > 0);
        setSearchText(undefined);

        if (!focused) {
            props.onBackPress();
        } else {
            Keyboard.dismiss();
            onBlur();
        }
    };

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const [places, placesResult] = usePlaces({
        skip: empty,
        searchText,
        first: 10,
    });

    return (
        <View
            style={[StyleSheet.absoluteFill, { flex: 1 }]}
            pointerEvents='box-none'
        >
            <Background focused={focused} />

            <Header
                onSearchTextChanged={setSearchText}
                animatedIndex={animatedIndex}
                onBackPress={onBackPress}
                searchText={searchText}
                onFocus={onFocus}
                onBlur={onBlur}
            />

            {focused && (
                <>
                    <SectionHeader
                        onChanged={() => {}}
                        index={0}
                    />

                    <ScrollView keyboardShouldPersistTaps='handled'>
                        {/* <View style={{
                            backgroundColor: 'purple',
                            height: 100,
                        }} /> */}
                    </ScrollView>
                </>
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