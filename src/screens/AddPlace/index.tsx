// React
import React, { memo, useRef, useCallback, useState } from 'react'

// Components
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import NewPlaceListModal from './NewPlaceListModal'
import NewPlaceListItem from './NewPlaceListItem'
import PlaceListItem from './PlaceListItem'
import { MessagePopup } from '@components'
import NavBar from './NavBar'

// Helpers
import { usePlaceLists, useAddPlace, useCreatePlaceList } from '@helpers'
import { useNavigation, useRoute } from '@navigation/utils'

// Constants
import { style } from '@constants'

// Types
import { Props as NewPlaceListModalProps, Ref as NewPlaceListModalRef } from './NewPlaceListModal'
import { Props as PlaceListItemProps } from './PlaceListItem'
import { MessagePopupRef } from '@components'


export default memo(function AddPlace() {

    const navigation = useNavigation();
    const { params } = useRoute<'AddPlace'>();

    const modalRef = useRef<NewPlaceListModalRef>(null);
    const successRef = useRef<MessagePopupRef>(null);

    const [placeLists, placeListsResult] = usePlaceLists({ first: 100 });

    const [createPlateList, createPlaceListResult] = useCreatePlaceList();
    const [addPlace, useAddPlaceResult] = useAddPlace();

    const onCreatePress = () => {
        modalRef.current.show();
    };

    const onCreateSubmit = useCallback<OnCreateSubmit>(
        async name => {
            console.log(`onCreateSubmit: ${name}`);
            await createPlateList({ name });
        },
        []
    );

    const onItemPress = useCallback<OnItemPress>(
        async item => {
            // console.log(`addPlace: ${JSON.stringify({
            //     placeId: params.placeId,
            //     placeListId: item.id,
            // })}`);
            try {
                await addPlace({
                    placeId: params.placeId,
                    placeListId: item.id,
                });
                await successRef.current?.show();
                navigation.goBack();
            } catch (e) {
                console.log(e)
            }
        },
        []
    );

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await placeListsResult.refetch();
        } finally {
            setRefreshing(false);
        }
    };

    // console.log(placeListsResult.error)
    // console.log(placeLists)
    if (placeListsResult.error) {
        return <ScrollView>
            <Text>
                {JSON.stringify(placeListsResult.error, null, 4)}
            </Text>
        </ScrollView>
    }

    return (
        <View style={style.container}>
            <NavBar
                onBackPress={navigation.goBack}
            />

            <FlatList
                ListHeaderComponent={(
                    <NewPlaceListItem
                        onPress={onCreatePress}
                    />
                )}
                renderItem={({ item }) => (
                    <PlaceListItem
                        onPress={onItemPress}
                        item={item.node}
                    />
                )}
                keyExtractor={({ node: { id } }) => id}
                data={placeLists?.edges}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />

            <NewPlaceListModal
                onSubmit={onCreateSubmit}
                ref={modalRef}
            />

            <MessagePopup
                message={'Ajouté'}
                ref={successRef}
            />
        </View>
    )
})

// Types
type OnItemPress = PlaceListItemProps['onPress']

type OnCreateSubmit = NewPlaceListModalProps['onSubmit']

const places = [
    { id: '0', name: 'Paris V' },
    { id: '1', name: 'Japonais' },
    { id: '2', name: 'Pizza & Sushi' },
    { id: '3', name: 'Végan' },
    { id: '4', name: 'Nouveautés' },
    { id: '5', name: 'Chic' },
]