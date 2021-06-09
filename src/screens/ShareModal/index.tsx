// React
import React, { memo, useState, forwardRef, useEffect } from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import SearchBar from './SearchBar'
import ShareItem from './ShareItem'
import Header from './Header'

// Data
import * as data from './data'


const Modal = forwardRef<Ref, Props>((props, ref) => {

    const [query, setQuery] = useState<string>();
    const [users, setUsers] = useState(data.users);

    useEffect(
        () => {
            if (query?.length > 0) {
                const results = [];
                data.users.forEach(user => {
                    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
                    const pattern = query.toLowerCase();
                    if (fullName.includes(pattern)) {
                        results.push(user);
                    }
                });
                setUsers(results);
            }
        },
        [query]
    );

    const onSharePress = (user) => {
        (ref as any)?.current?.close?.();
    }

    return (
        <Portal>
            <Modalize
                // snapPoint={400}
                modalStyle={styles.modal}
                HeaderComponent={(
                    <>
                        <Header
                            title='Partager'
                        />
                        <SearchBar
                            onChange={setQuery}
                            value={query}
                        />
                    </>
                )}
                flatListProps={{
                    renderItem: ({ item }) => (
                        <ShareItem
                            onPress={onSharePress}
                            item={item}
                        />
                    ),
                    data: users,
                }}
                ref={ref}
            />
        </Portal>
    )
})

export default memo(Modal)

// Styles
const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
})

// Types
export type Props = {
    onSendPress: () => void,
}

export type Ref = Modalize