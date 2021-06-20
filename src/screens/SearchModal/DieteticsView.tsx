// React
import React, { memo, useRef, useMemo, useCallback } from 'react'

// Components
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import DieteticItem from './DieteticItem'

// Icons
import GlutenFreeIcon from '@assets/images/dietetic/gluten-free.svg'
import VegetarianIcon from '@assets/images/dietetic/vegetarian.svg'
import HalalIcon from '@assets/images/dietetic/halal.svg'
// import VeganIcon from '@assets/images/dietetic/vegan.svg'

// Types
import { Props as DieteticItemProps } from './DieteticItem'
import { Dietetic } from '@types'


export default memo((props: Props) => {

    const { current: selectionSet } = useRef<Set<string>>(new Set);
    const { selection, onChange } = props;

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

    return (
        <View style={styles.container}>
            <BottomSheetFlatList
                contentContainerStyle={styles.content}
                showsHorizontalScrollIndicator={false}
                keyExtractor={({ id }) => id}
                data={dietetics}
                renderItem={({ item }) => (
                    <DieteticItem
                        selected={selectionSet.has(item.id)}
                        onRemovePress={onRemovePress}
                        onSelectPress={onSelectPress}
                        item={item}
                    />
                )}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                )}
            />
        </View>
    )
})

// Constants
const { width, height } = Dimensions.get('window')

const dietetics: Dietetic[] = [
    { id: 'vegetarian', name: 'Végérarien', Icon: VegetarianIcon },
    { id: 'halal', name: 'Halal', Icon: HalalIcon },
    // { id: 'vegan', name: 'Vegan', Icon: VeganIcon },
    { id: 'gluten-free', name: 'Sans gluten', Icon: GlutenFreeIcon },
]

// Styles
const styles = StyleSheet.create({
    container: {
        width,
    },
    content: {
        paddingBottom: height + 300,
        // paddingHorizontal: 10,
    },
    separator: {
        backgroundColor: '#f0f0f0',
        marginHorizontal: 20,
        height: 1,
    },
})

// Types
export type Props = {
    onChange: (selection: string[]) => void,
    selection: string[],
}

type OnRemovePress = DieteticItemProps ['onRemovePress']

type OnSelectPress = DieteticItemProps ['onSelectPress']