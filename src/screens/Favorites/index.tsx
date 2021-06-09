// React
import React, { memo, useState, useCallback, useRef } from 'react'

// Components
import { View, FlatList, Alert, StatusBar } from 'react-native'
import FavoriteItem from './FavoriteItem'
import SectionList from './SectionList'
import ShareModal from '../ShareModal'
import Header from './Header'

// Constants
import { font, color } from '@constants'

// Types
import { Props as SectionListProps } from './SectionList'
import { Ref as ShareModalRef } from '../ShareModal'

// Data
import { favorites, establishments } from './data'


export default memo(() => {

    const [index, setIndex] = useState(0);
    // const [state, setState] = useState<StateEvent>()

    const shareModalRef = useRef<ShareModalRef>(null);

    const onChange = useCallback<SectionListProps['onChange']>(
        index => setIndex(index),
        []
    );

    const onSharePress = () => {
        // Alert.alert('Share');
        shareModalRef.current?.open();
    };

    return (
        <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
            
            <Header
                onSharePress={onSharePress}
                title='Liked restaurants'
            />

            <SectionList
                onChange={onChange}
                data={favorites}
                index={index}
            />

            <FlatList
                data={establishments}
                keyExtractor={({ id }) => id}
                numColumns={2}
                contentContainerStyle={{
                    paddingHorizontal: 5,
                    paddingBottom: 120,
                    marginTop: 10,
                }}
                renderItem={({ item }) => (
                    <FavoriteItem
                        item={item}
                        onPress={null}
                    />
                )}
            />

            <ShareModal
                ref={shareModalRef}
                onSendPress={null}
            />

        </View>
    )
})