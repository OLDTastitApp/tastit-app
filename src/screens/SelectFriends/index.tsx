// React
import React, { memo, useState, useCallback, useRef } from 'react'

// Components
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from '@navigation/utils'
import { View, Text } from 'react-native'
import NavBar from './NavBar'

// Constants
import { ui, font, color, style } from '@constants'

// Types
import { MessagePopupRef } from '@components'


export default memo(() => {

    const navigation = useNavigation();
    const [search, setSearch] = useState<string>();

    return (
        <View style={style.container}>
            <NavBar
                onBackPress={navigation.goBack}
                barStyle='dark-content'
            />

            <Text>
                SELECT FRIENDS !!!!!
            </Text>

            {/* <KeyboardAwareFlatList
                ListHeaderComponent={() => (
                    <>
                        {location.error && (
                            <GeolocationError
                                onPress={onOpenSettingsPress}
                            />
                        )}
                        {hasNearestPlace && (
                            <NearestPlace
                                item={nearestPlaces.edges[0].node}
                                // onPress={() => {}}
                                onSelectPress={onPlaceItemPress}
                                onDismissPress={onDismissPress}
                            />
                        )}
                    </>
                )}
                renderItem={({ item }) => (
                    null
                    // <PlaceItem
                    //     onPress={onPlaceItemPress}
                    //     item={item.node}
                    // />
                )}
                keyExtractor={({ node }) => node.id}
                keyboardShouldPersistTaps='handled'
                // keyboardDismissMode='interactive'
                enableResetScrollToCoords
                data={places?.edges}
            /> */}
        </View>
    )
})