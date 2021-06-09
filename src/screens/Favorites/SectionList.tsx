// React
import React, { memo, useCallback } from 'react'

// Components
import { View, FlatList, StyleSheet } from 'react-native'
import SectionItem from './SectionItem'

// Types
import { ItemEvent, Props as SectionItemProps } from './SectionItem'
import { Favorite } from '@types'


export default memo((props: Props) => {

    const { onChange } = props;

    const onPress = useCallback<OnPress>(
        // event => onChange?.(event),
        event => onChange?.(event.index),
        [onChange]
    );

    return (
        <View>
            <FlatList
                contentContainerStyle={styles.content}
                showsHorizontalScrollIndicator={false}
                keyExtractor={({ id }) => id}
                renderItem={({ item, index }) => (
                    <SectionItem
                        selected={props.index === index}
                        onPress={onPress}
                        index={index}
                        item={item}
                    />
                )}
                style={styles.container}
                data={props.data}
                horizontal
            />
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    content: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
})

// Types
export type Props = {
    // onChange: (event: ItemEvent) => void,
    onChange: (index: number) => void,
    data: Favorite[],
    index: number,
}

type OnPress = SectionItemProps['onPress']

export type StateEvent = ItemEvent