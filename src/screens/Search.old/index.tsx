// React
import React, { memo, forwardRef, useImperativeHandle, useCallback, useState } from 'react'

// Components
import { View, Modal, FlatList, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { FancyTabs } from '@components'
import EmptyPlaceholder from './EmptyPlaceholder'
import NoResults from './NoResults'
import PlaceItem from './PlaceItem'
import Header from './Header'
import NavBar from './NavBar'

// Helpers
import usePlaces from './usePlaces'

// Constants
import { style } from '@constants'

// Types
import { Props as PlaceItemProps } from './PlaceItem'
import { FancyTabsProps } from '@components'


export default memo(forwardRef<Ref, Props>((props, ref) => {

    useImperativeHandle(ref, () => ({ dismiss, show }), []);

    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<string>();

    const [query, setQuery] = useState<string>();

    const dismiss = () => setVisible(false);
    const show = () => setVisible(true);

    // ...
    // console.log(`search: ${query}`);

    const [places, placesResult] = usePlaces({
        skip: !(query?.length > 0),
        search: query,
        limit: 5,
    });

    const onPlacePress = useCallback<OnPlacePress>(
        item => {
            props.onPlacePress(item);
            setQuery(undefined);
            dismiss();
        },
        []
    );

    const hasPlaces = places?.edges?.length > 0;
    const noResults = query?.length > 0 && !hasPlaces;
    const empty = !(query?.length > 0) && !hasPlaces;

    return (
        <Modal visible={visible}>
            <KeyboardAvoidingView
                style={style.container}
                behavior='padding'
            >
                <NavBar
                    onBackPress={dismiss}
                />

                <Header
                    onQueryChanged={setQuery}
                    query={query}
                />

                <FlatList
                    renderItem={({ item }) => (
                        <PlaceItem
                            onPress={onPlacePress}
                            item={item.node}
                        />
                    )}
                    ListEmptyComponent={() => (
                        empty ? (
                            <EmptyPlaceholder />
                        ) : noResults ? (
                            <NoResults />
                        ) : null
                    )}
                    contentContainerStyle={{ paddingVertical: 20 }}
                    keyExtractor={({ node: { id } }) => id}
                    keyboardShouldPersistTaps='handled'
                    data={places?.edges}
                />
            </KeyboardAvoidingView>
        </Modal>
    )
}))

// Types
export type Props = {
    onPlacePress: OnPlacePress,
}

export type Ref = {
    dismiss: () => void,
    show: () => void,
}

type OnPlacePress = PlaceItemProps['onPress']