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


const districts: District[] = [
    '1er', ...[...Array(19)].map((_, i) => `${i + 2}ème`)
].map((name, i) => ({ id: `${i + 1}`, name }));

export default memo((props: Props) => {

    // const [selection, setSelection] = useState<Set<string>>(new Set);
    const { current: selectionMap } = useRef(new Map);
    const { current: selectionSet } = useRef<Set<string>>(new Set);

    const { selection, onChange } = props;

    useMemo(
        () => {
            // selectionMap.clear();
            // selection.forEach(
            //     item => selectionMap.set(item, item)
            // );
            selectionSet.clear();
            selection.forEach(id => selectionSet.add(id));
        },
        [selection]
    );

    const onRemovePress = useCallback<OnRemovePress>(
        item => {
            // const updatedMap = new Map(selectionMap);
            // updatedMap.delete(item.id);
            // onChange([...updatedMap.values()]);
            const updatedSet = new Set(selectionSet);
            updatedSet.delete(item.id);
            onChange([...updatedSet.values()]);
        },
        [selection]
    );

    const onSelectPress = useCallback<OnSelectPress>(
        item => {
            // const updatedMap = new Map(selectionMap);
            // updatedMap.set(item.id, item);
            // onChange([...updatedMap.values()]);
            const updatedSet = new Set(selectionSet);
            updatedSet.add(item.id);
            console.log(`onSelectPress: ${JSON.stringify([...updatedSet.values()])}`)
            onChange([...updatedSet.values()]);
        },
        []
    );

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
                        // selected={selectionMap.has(item.id)}
                        selected={selectionSet.has(item.id)}
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
    // onChange: (selection: District[]) => void,
    onChange: (selection: string[]) => void,
    // selection: District[],
    selection: string[],
    data: District[],
}

type OnRemovePress = DistrictItemProps['onRemovePress']

type OnSelectPress = DistrictItemProps['onSelectPress']