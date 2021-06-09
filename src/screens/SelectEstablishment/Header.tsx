// React
import React, { memo, useCallback } from 'react'

// Components
import { View, TextInput, StyleSheet } from 'react-native'
import Search from '@assets/images/search.svg'

// Constants
import { ui, font, color } from '@constants'

// Types
import { FancyTabsProps } from '@components'


export default memo((props: Props) => {

    return (
        <View style={styles.content}>
            <Search
                // fill={color.darkGray}
                fill={`${color.darkGray}77`}
            />
            <TextInput
                onChangeText={props.onQueryChanged}
                placeholder='Le restaurant du coin'
                style={styles.input}
                value={props.query}
                autoCorrect={false}
            />
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    content: {
        // backgroundColor: '#f2f2f2',
        // // borderColor: color.darkGray,
        // flexDirection: 'row',
        // alignItems: 'center',
        // paddingHorizontal: 15,
        // marginHorizontal: 20,
        // marginVertical: 20,
        // paddingVertical: 5,
        // borderRadius: 100,
        // // borderWidth: 1,
        // marginTop: 10,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    input: {
        fontFamily: font.regular,
        color: color.dark,
        marginLeft: 10,
        fontSize: 18,
        flex: 1,
    },
})

// Types
type Props = {
    onQueryChanged: (query: string) => void,
    query: string,
}