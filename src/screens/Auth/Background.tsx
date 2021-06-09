// React
import React, { memo } from 'react'

// Components
import { View, useWindowDimensions, StyleSheet, Image } from 'react-native'


export default memo((props: Props) => {

    const { pictureUris, numberOfItems = 3 } = props;

    const { width, height } = useWindowDimensions();
    const margin = 2 * containerMargin + 2 * numberOfItems * contentMargin;
    const w = (width - margin) / numberOfItems;
    const h = 1.5 * w;

    const numberOfRows = Math.round(height / h) + 1;

    return (
        <Image
            style={StyleSheet.absoluteFill}
            source={{ uri: pictureUris[8] }}
        />
    )

    return (
        <View style={StyleSheet.absoluteFillObject}>
            {[...Array(numberOfRows).keys()].map(i => (
                <View
                    style={styles.row}
                    key={i}
                >
                    {[...Array(numberOfItems).keys()].map(j => {

                        const k = (3 * i + j) % pictureUris.length;
                        const even = j % 2 === 0;
                        
                        return (
                            <Image
                                style={[
                                    { width: w, height: h },
                                    even && { top: -h / 2 },
                                    styles.image,
                                ]}
                                source={{ uri: pictureUris[k] }}
                                key={3 * j}
                            />
                        )
                    })}
                </View>
            ))}
        </View>
    )
})

// Constants
const containerMargin = 10
const contentMargin = 5

// Styles
const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-evenly',
        marginVertical: contentMargin,
        flexDirection: 'row',
    },
    image: {
        borderRadius: 10,
    },
})

// Types
type Props = {
    numberOfItems?: number,
    pictureUris: string[],
}