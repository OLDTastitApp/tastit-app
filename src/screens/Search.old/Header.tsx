// React
import React, { memo, useCallback } from 'react'

// Components
import { View, TextInput, StyleSheet } from 'react-native'
import Search from '@assets/images/search.svg'
import { FancyTabs } from '@components'

// Constants
import { ui, font, color } from '@constants'

// Types
import { FancyTabsProps } from '@components'


export default memo((props: Props) => {

    const onTabChange = useCallback<FancyTabsProps['onChange']>(
        ({ item, index }) => {},// setType(item.id),
        []
    );

    return (
        <>
            <View style={styles.content}>
                <Search
                    fill={color.darkGray}
                />
                <TextInput
                    onChangeText={props.onQueryChanged}
                    placeholder='Le Café du ...'
                    style={styles.input}
                    value={props.query}
                    autoCorrect={false}
                />
            </View>

            <View style={{
                flexDirection: 'row',
            }}>
                <FancyTabs
                    onChange={onTabChange}
                    data={sections}
                />
            </View>

            <View style={styles.separator} />
        </>
    )
})

// Constants
const sections = [
    { id: 'top', name: 'Top' },
    { id: 'accounts', name: 'Accounts' },
    { id: 'places', name: 'Places' },
    { id: 'hashtags', name: 'Hashtags' },
]

// Styles
const styles = StyleSheet.create({
    content: {
        backgroundColor: '#f2f2f2',
        borderColor: color.darkGray,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginHorizontal: 20,
        marginVertical: 20,
        paddingVertical: 5,
        borderRadius: 100,
        borderWidth: 1,
        marginTop: 10,
    },
    input: {
        fontFamily: font.regular,
        color: color.dark,
        marginLeft: 10,
        fontSize: 18,
        flex: 1,
    },
    separator: {
        backgroundColor: color.darkGray,
        marginHorizontal: 20,
        height: 1,
    },
})

// Types
type Props = {
    onQueryChanged: (query: string) => void,
    query: string,
}