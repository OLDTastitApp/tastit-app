// React
import React, { memo, useState, useEffect } from 'react'

// Components
import { View, LayoutAnimation, StyleSheet } from 'react-native'


export default memo((props: Props) => {

    const [focused, setFocused] = useState(props.focused);

    useEffect(
        () => {
            if (focused === props.focused) return;

            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
            );
            setFocused(props.focused);
        },
        [props.focused]
    );

    return focused && <View style={styles.container} />
})

// Styles
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
    },
})

// Types
export type Props = {
    focused: boolean,
}