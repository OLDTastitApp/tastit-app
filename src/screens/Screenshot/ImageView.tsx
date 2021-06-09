// React
import React, { memo } from 'react'

// Components
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'

// Utils
import { filters } from './utils'

// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => {
    
    const { imageUri, filter } = props;
    const [_, Filter] = filters.find(
        ([name]) => name === filter
    ) ?? [];

    return (
        <View style={StyleSheet.absoluteFill}>
            <Image
                style={[styles.image, { position: 'absolute' }]}
                source={{ uri: imageUri }}
            />
            {filter && (
                <Filter
                    // onFilteringStart={() => {}}
                    // onFilteringFinish={() => {}}
                    // onFilteringError={() => {}}
                    style={{ width, height }}
                    image={(
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.image}
                        />
                    )}
                />
            )}
        </View>
    )
})

// Constants
const { width, height } = Dimensions.get('window')

// Styles
const styles = StyleSheet.create({
    container: {
        // height: width,
    },
    image: {
        // flex: 1,
        height,
        // height: 320,
        // width: 320,
        width,
    }
})

// Types
type Props = {
    // renderFilter: () => void,
    // title: string,
    imageUri: string,
    filter: string,
}