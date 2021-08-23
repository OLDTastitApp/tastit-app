// React
import React, { memo, useRef, useMemo, useCallback } from 'react'

// Components
import { View, StyleSheet, Dimensions } from 'react-native'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import GastronomyItem from './GastronomyItem'

// Helpers
import { usePlaceTags } from '@helpers'

// Types
import { Props as GastronomyItemProps } from './GastronomyItem'
import { Gastronomy } from '@types'


export default memo((props: Props) => {

    const { current: selectionSet } = useRef<Set<string>>(new Set);
    const { selection, onChange } = props;

    const [placeTags, placeTagsResult] = usePlaceTags();

    useMemo(
        () => {
            selectionSet.clear();
            selection.forEach(id => selectionSet.add(id));
        },
        [selection]
    );

    const onRemovePress = useCallback<OnRemovePress>(
        item => {
            const updatedSet = new Set(selectionSet);
            updatedSet.delete(item.id);
            onChange([...updatedSet.values()]);
        },
        [selection]
    );

    const onSelectPress = useCallback<OnSelectPress>(
        item => {
            const updatedSet = new Set(selectionSet);
            updatedSet.add(item.id);
            onChange([...updatedSet.values()]);
        },
        []
    );

    if (!placeTags) return null;

    return (
        <View style={styles.container}>
            <BottomSheetScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {placeTags.map(item => {
                    return (
                        <GastronomyItem
                            selected={selectionSet.has(item.id)}
                            onRemovePress={onRemovePress}
                            onSelectPress={onSelectPress}
                            key={item.id}
                            item={item}
                        />
                    )
                })}
            </BottomSheetScrollView>
        </View>
    )
})

// Constants
const { width, height } = Dimensions.get('window')

// const gastronomies: Gastronomy[] = [
//     { id: 'bistro', name: 'Bistro' },
//     { id: 'pizzeria', name: 'Pizzeria' },
//     { id: 'bar', name: 'Bar' },
//     { id: 'street-food', name: 'Street food' },
//     { id: 'grec-restaurant', name: 'Restaurant Grec' },
//     { id: 'kebab', name: 'Kebab' },
//     { id: 'fast-food', name: 'Fast food' },
// ]

// Styles
const styles = StyleSheet.create({
    container: {
        width,
    },
    content: {
        paddingBottom: height + 300,
        paddingHorizontal: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})

// Types
export type Props = {
    onChange: (selection: string[]) => void,
    selection: string[],
}

type OnRemovePress = GastronomyItemProps['onRemovePress']

type OnSelectPress = GastronomyItemProps['onSelectPress']