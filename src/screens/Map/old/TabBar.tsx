// React
import React, { memo, useState, useMemo, useCallback, useRef } from 'react'

// Components
import { View, FlatList, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'
import DistrictItem from './DistrictItem'

// Constants
import { color, font } from '@constants'

// Types
import { Props as DistrictItemProps } from './DistrictItem'
import { District } from '@types'


export default memo((props: Props) => {

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.content}
                showsHorizontalScrollIndicator={false}
                keyExtractor={({ id }) => id}
                data={districts}
                horizontal
                renderItem={({ item }) => (
                    <DistrictItem
                        selected={selectionMap.has(item.id)}
                        onRemovePress={onRemovePress}
                        onSelectPress={onSelectPress}
                        item={item}
                    />
                )}
            />
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // paddingVertical: 10,
        paddingBottom: 20,
    },
    content: {
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: font.bold,
        marginHorizontal: 10,
        color: color.dark,
        fontSize: 17,
        flex: 1,
    },
    button: {
        padding: 10,
    },
    action: {
        fontFamily: font.regular,
        color: color.primary,
        marginHorizontal: 10,
        fontSize: 17,
    },
})

// Types
export type Props = {
    onChange: (selection: District[]) => void,
    selection: District[],
    data: District[],
}

type OnRemovePress = DistrictItemProps['onRemovePress']

type OnSelectPress = DistrictItemProps['onSelectPress']