// React
import React, { memo } from 'react'

// Components
import { Text, Image, StyleSheet, View } from 'react-native'
import { TouchableScale } from '@components'

// Utils
import { Filter } from './utils'

// Constants
import { font, color } from '@constants'


export default memo((props: Props) => {

    const { uri, item, selected, empty } = props;

    const [name, Filter] = item;

    const onPress = () => {
        props.onPress?.(name);
    };

    return (
        <TouchableScale
            style={styles.container}
            disabled={selected}
            activeScale={0.98}
            onPress={onPress}
        >
            <View
                style={[
                    styles.wrapper,
                    selected && styles.wrapperSelected,
                ]}
            >
                <View style={styles.placeholder}>
                    {!empty && (
                        <Filter
                            image={(
                                <Image
                                    style={styles.image}
                                    // resizeMode='cover'
                                    source={{ uri }}
                                    blurRadius={0.5}
                                />
                            )}
                        />
                    )}
                </View>
            </View>

            <Text
                style={[
                    styles.name,
                    selected && styles.nameSelected,
                ]}
                adjustsFontSizeToFit
                numberOfLines={1}
            >
                {name}
            </Text>
        </TouchableScale>
    )
})

// Constants
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 6,
    },
    wrapper: {
        borderColor: 'transparent',
        borderRadius: 80 + 2,
        borderWidth: 2,
    },
    wrapperSelected: {
        borderColor: 'white',
    },
    placeholder: {
        backgroundColor: 'white',
        borderRadius: 80,
        margin: 2,
    },
    image: {
        borderRadius: 80,
        height: 80,
        width: 80,
    },
    name: {
        fontFamily: font.regular,
        textAlign: 'center',
        color: color.light,
        marginTop: 5,
        fontSize: 14,
    },
    nameSelected: {
        fontFamily: font.bold,
    },
})

// Types
export type Props = {
    onPress: (filter: string) => void,
    selected?: boolean,
    empty?: boolean,
    uri: string,
    item: Item,
}

type Item = [string, Filter]