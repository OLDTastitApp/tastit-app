// React
import React, { memo } from 'react'

// Components
import { Image, StyleSheet, View } from 'react-native'
import { TouchableScale } from '@components'

// Helpers
import { useWindowDimensions } from 'react-native'

// Constants
import { color } from '@constants'

// Types
import { Post } from '@types'


export default memo((props: Props) => {

    const { item } = props;

    const { width } = useWindowDimensions();
    const numberOfColumns = 3;
    const margin = 2;

    const size = (width - 2 * margin * (numberOfColumns + 1)) / 3;

    const onPress = () => {
        props.onPress?.(props.item);
    };
    
    return (
        <TouchableScale
            style={[
                { width: size + 2 * margin },
                styles.container,
            ]}
            activeScale={0.98}
            onPress={onPress}
        >
            <Image
                // source={{ uri: props.item }}
                source={{ uri: item.picture.url }}
                style={[
                    styles.image,
                    {
                        height: 1.5 * size,
                        width: size,
                    },
                ]}
            />
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        backgroundColor: color.mediumGray,
        // marginHorizontal: 2,
        marginVertical: 2,
        borderRadius: 5,
    },
})

// Types
export type Props = {
    onPress: (item: Post) => void,
    index: number,
    item: Post,
}

// type Item = string
// type Item = Pos