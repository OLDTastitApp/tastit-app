// React
import React, { memo, useMemo, useRef, useCallback } from 'react'

// Components
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native'
import DistrictItem from './DistrictItem'
import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetFlatList,
    useBottomSheetSpringConfigs,
    useBottomSheetTimingConfigs
} from '@gorhom/bottom-sheet'

// Types
import { Props as DistrictItemProps } from './DistrictItem'
import { District } from '@types'


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

            {/* <BottomSheetScrollView
                contentContainerStyle={styles.content}
            >    
                {districts.map((item) => (
                    <DistrictItem
                        selected={selectionSet.has(item.id)}
                        onRemovePress={onRemovePress}
                        onSelectPress={onSelectPress}
                        key={item.id}
                        item={item}
                    />
                ))}
            </BottomSheetScrollView> */}

            <BottomSheetFlatList
                contentContainerStyle={styles.content}
                showsHorizontalScrollIndicator={false}
                keyExtractor={({ id }) => id}
                disableVirtualization
                data={districts}
                // horizontal
                numColumns={3}
                renderItem={({ item }) => (
                    <DistrictItem
                        selected={selectionSet.has(item.id)}
                        onRemovePress={onRemovePress}
                        onSelectPress={onSelectPress}
                        item={item}
                    />
                )}
            />


            {/* <FlatList
                contentContainerStyle={styles.content}
                showsHorizontalScrollIndicator={false}
                keyExtractor={({ id }) => id}
                disableVirtualization
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
            /> */}
            

            {/* <BottomSheetScrollView
                contentContainerStyle={{
                    backgroundColor: 'green',
                }}
            >
                {data.map(renderItem)}
            </BottomSheetScrollView> */}
        </View>
    )
})

// Constants
export const districts: District[] = [
    '1er', ...[...Array(19)].map((_, i) => `${i + 2}ème`)
].map((name, i) => ({
    id: `750${''.padEnd(+(i > 10), '0')}${i}`,
    name,
}))

const { width, height } = Dimensions.get('window')

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'blue',
        // height: 100,
        width,
    },
    content: {
        paddingHorizontal: 10,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        paddingBottom: height + 300,
    },
})

// Types
type Props = {
    onChange: (selection: string[]) => void,
    selection: string[],
    // data: District[],
}

type OnRemovePress = DistrictItemProps['onRemovePress']

type OnSelectPress = DistrictItemProps['onSelectPress']