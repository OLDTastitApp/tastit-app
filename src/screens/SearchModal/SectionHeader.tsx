// React
import React, { memo } from 'react'

// Components
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import GastronomyIcon from '@assets/images/gastronomy.svg'
import DieteticsIcon from '@assets/images/dietetics.svg'
import DistrictIcon from '@assets/images/district.svg'
import PricingIcon from '@assets/images/pricing.svg'
import { TouchableScale } from '@components'

// Constants
import { color, font } from '@constants'

export default memo((props: Props) => {

    const { index, onPress, onChanged } = props;

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={1}
        >
            <View style={styles.handle} />

            <Text style={styles.title}>
                Trouver un lieu
            </Text>

            <View style={styles.footer}>
                {items.map(({ name, Icon }, i) => {

                    const selected = index === i;
                    
                    return (
                        <TouchableScale
                            style={[
                                styles.item,
                                selected && styles.itemSelected,
                            ]}
                            onPress={() => onChanged(i)}
                            disabled={selected}
                            key={i}
                        >
                            <View style={styles.icon}>
                                <Icon fill={!selected ? color.darkGray : 'white'} />
                            </View>

                            <Text
                                style={[
                                    styles.name,
                                    selected && styles.nameSelected,
                                ]}
                                adjustsFontSizeToFit
                                numberOfLines={1}
                            >
                                {name}
                            </Text>
                        </TouchableScale>
                    )
                })}
            </View>
        </TouchableOpacity>
    )
})

// Constants
const items = [
    { name: 'Quartier', Icon: DistrictIcon },
    { name: 'Prix', Icon: PricingIcon },
    { name: 'Diététique', Icon: DieteticsIcon },
    { name: 'Gastronomie', Icon: GastronomyIcon },
]

const margin = 3
const { width } = Dimensions.get('window')
const itemWidth = (width - 2 * 20 + 2 * margin) / 4 - 2 * margin

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'purple',
        // height: 50,
        // flex: 1,
        // marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,
        // width,
    },
    handle: {
        backgroundColor: color.lightGray,
        alignSelf: 'center',
        borderRadius: 6,
        width: 40,
        height: 6,
    },
    title: {
        // fontFamily: font.semiBold,
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
        fontWeight: '600',
        color: color.dark,
        marginTop: 20,
        fontSize: 22,
    },
    footer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 20,
    },
    item: {
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // minHeight: itemWidth,
        paddingVertical: 10,
        borderRadius: 12,
        width: itemWidth,
    },
    itemSelected: {
        backgroundColor: color.dark,
    },
    icon: {
        justifyContent: 'center',
        height: 30,
    },
    name: {
        fontFamily: 'Avenir Next',
        color: color.darkGray,
        marginHorizontal: 4,
        fontWeight: '500',
        marginTop: 10,
        fontSize: 12,
    },
    nameSelected: {
        color: 'white',
    },
})

// Types
type Props = {
    onChanged: (index: number) => void,
    onPress: () => void,
    index: number,
}