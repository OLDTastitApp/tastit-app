// React
import React, { memo, useMemo, useCallback } from 'react'

// Components
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import BottomSheet, {
    BottomSheetScrollView,
    useBottomSheetSpringConfigs,
    useBottomSheetTimingConfigs
} from '@gorhom/bottom-sheet'


export default memo((props: Props) => {

    const data = useMemo(
        () =>
          Array(50)
            .fill(0)
            .map((_, index) => `index-${index}`),
        []
    );

    const renderItem = useCallback(
        item => (
          <TouchableOpacity key={item} style={{
            padding: 6,
            margin: 6,
            backgroundColor: '#eee',
          }}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ),
        []
    );

    return (
        // <View style={styles.container}>
            <BottomSheetScrollView
                contentContainerStyle={{
                    backgroundColor: 'green',
                    // minHeight: 2000,
                    width,
                }}
            >
                {data.map(renderItem)}
            </BottomSheetScrollView>
        // </View>
    )
})

// Constants
const { width } = Dimensions.get('window')

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        // height: 100,
        width,
        // flex: 1,
    },
})

// Types
type Props = {
    // ...
}