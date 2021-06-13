// React
import React, { memo, useState, useRef, useEffect, useCallback } from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'
import { FancyTabs } from '@components'

// Constants
import { color } from '@constants'

// Types
import { FancyTabsProps } from '@components'


export default memo((props: Props) => {

    const onChange = useCallback<FancyTabsProps['onChange']>(
        ({ item, index }) => props.onChanged(index),
        [props.onChanged]
    );

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Resultats
            </Text>

            <View style={styles.tabs}>
                <FancyTabs
                    color={color.primary}
                    onChange={onChange}
                    data={sections}
                />
            </View>
        </View>
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
    container: {
        marginTop: 20,
    },
    title: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
        fontWeight: '600',
        color: color.dark,
        marginBottom: 15,
        fontSize: 22,
    },
    tabs: {
        flexDirection: 'row',
    },
})

// Types
export type Props = {
    onChanged: (index: number) => void,
    index: number,
}