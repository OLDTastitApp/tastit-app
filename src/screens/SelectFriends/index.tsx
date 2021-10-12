// React
import React, { memo, useState, useCallback, useRef } from 'react'

// Components
// import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { FlatList, ScrollView, Text, View, LayoutAnimation, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import SelectedUserItem from './SelectedUserItem'
import { UserItem } from '@components'
import NavBar from './NavBar'

// Helpers
import { useNavigation, useRoute } from '@navigation/utils'
import { useFriends, useUsers } from '@helpers'

// Utils
import update from 'immutability-helper'

// Constants
import { ui, font, color, style } from '@constants'

// Types
import { UserItemProps } from '@components'
import { User } from '@types'


export default memo(() => {

    const navigation = useNavigation();
    const { params } = useRoute<'SelectFriends'>();

    const [searchText, setSearchText] = useState<string>();

    const { current: selectionSet } = useRef(new Set<string>(params?.users?.map(({ id }) => id)));
    const [selection, setSelection] = useState<User[]>(params.users ?? []);

    // const [friends, friendsResult] = useFriends({ searchText, first: 10 });
    const [friends, friendsResult] = useFriends({
        // skip: !(searchText?.length > 0),
        first: 10,
    });

    const [users, usersResult] = useUsers({
        skip: !(searchText?.length > 0),
        searchText,
        first: 10,
    });

    const onPress = useCallback<OnPress>(
        item => {
            const selected = selectionSet.has(item.id);
            if (selected) {
                selectionSet.delete(item.id);
                if (selectionSet.size === 0) {
                    console.log(`Configure next REMOVE`);
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                }
                setSelection(selection => {
                    const index = selection.findIndex(
                        ({ id }) => id === item.id
                    );
                    return update(selection, {
                        $splice: [[index, 1]],
                    });
                })
            } else {
                selectionSet.add(item.id);
                if (selectionSet.size === 1) {
                    console.log(`Configure next ADD`);
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                }
                setSelection(selection => [item, ...selection]);
            }
        },
        []
    );

    const onSubmitPress = () => {
        params.setUsers(selection);
        navigation.goBack();
    };

    const canSubmit = selection.length > 0 || params?.users?.length > 0;

    const data = searchText?.length > 0 ? users : friends;

    return (
        <View style={style.container}>
            <NavBar
                onSearchTextChanged={setSearchText}
                onBackPress={navigation.goBack}
                onSubmitPress={onSubmitPress}
                searchText={searchText}
                barStyle='dark-content'
                canSubmit={canSubmit}
            />

            {/* <ScrollView>
                <Text>
                    {JSON.stringify(friendsResult.error, null, 4)}
                    {friends?.edges?.length}
                </Text>
            </ScrollView> */}

            {searchText?.length > 0 || friends?.edges?.length > 0 ? (
                <FlatList
                    ListHeaderComponent={() => (
                        <FlatList
                            style={{ marginBottom: selection?.length > 0 ? 20 : 0 }}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <SelectedUserItem
                                    // selected={selectionSet.has(item.id)}
                                    onPress={onPress}
                                    item={item}
                                />
                            )}
                            keyExtractor={({ id }) => id}
                            data={selection}
                            horizontal
                        />
                    )}
                    renderItem={({ item }) => (
                        <UserItem
                            selected={selectionSet.has(item.node.id)}
                            onPress={onPress}
                            item={item.node}
                        />
                    )}
                    keyExtractor={({ node: { id } }) => id}
                    keyboardShouldPersistTaps='handled'
                    keyboardDismissMode='interactive'
                    // enableResetScrollToCoords
                    extraData={selection}
                    // data={friends}
                    data={data?.edges}
                />
            ) : (
                <View style={styles.footer}>
                    <Feather
                        color={color.mediumGray}
                        name='frown'
                        size={30}
                    />
                    <Text style={styles.empty}>
                        Rajoute des amis pour les trouver plus rapidement
                    </Text>
                </View>
            )}
        </View>
    )
})

const styles = StyleSheet.create({
    footer: {
        // alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 30,
        marginTop: 100,
        // justifyContent: 'center',
        // backgroundColor: 'red',
        alignItems: 'center',
        flex: 1,
    },
    empty: {
        fontFamily: 'Avenir Next',
        color: color.mediumGray,
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 20,
        fontSize: 16,
    },
})

// Types
type OnPress = UserItemProps['onPress']