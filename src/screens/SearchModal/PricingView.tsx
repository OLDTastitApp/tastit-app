// React
import React, { memo } from 'react'

// Components
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { color } from '@constants'

// Types
import { Pricing } from '@types'


export default memo((props: Props) => {

    const { selection, onChange } = props;

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                {pricings.map(item => {

                    const selected = selection?.id === item.id;
                    
                    return (
                        <TouchableScale
                            style={[
                                styles.item,
                                selected && styles.itemSelected,
                            ]}
                            onPress={() => onChange(item)}
                            disabled={selected}
                            key={item.id}
                        >
                            <Text style={[
                                styles.label,
                                selected && styles.labelSelected,
                            ]}>
                                {item.label}
                            </Text>
                        </TouchableScale>
                    )
                })}
            </View>
        </View>
    )
})

// Constants
const { width } = Dimensions.get('window')

const pricings: Pricing[] = [
    { id: '0', min: 0, max: 16, label: '< 16€' },
    { id: '1', min: 16, max: 26, label: '16€ - 25€' },
    { id: '2', min: 26, max: 36, label: '26€ - 35€' },
    { id: '3', min: 36, max: 51, label: '36€ - 50€' },
    { id: '4', min: 51, max: null, label: '> 51€' },
]

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'green',
        // height: 100,
        width,
    },
    wrapper: {
        // backgroundColor: 'blue',
        // flex: 1,
        marginHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    item: {
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 20,
        marginHorizontal: 2,
        marginVertical: 2,
        padding: 10,
    },
    itemSelected: {
        backgroundColor: color.primary,
    },
    label: {
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        color: '#646e75',
        fontSize: 16,
    },
    labelSelected: {
        color: 'white',
    },
})

// Types
export type Props = {
    onChange: (pricing: Pricing) => void,
    selection?: Pricing,
}