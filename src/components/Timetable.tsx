// React
import React, { memo, useState } from 'react'

// Components
import { View, Text, StyleSheet, LayoutAnimation } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import TouchableScale from './TouchableScale'


export default memo((props: Props) => {

    const [expanded, setExpanded] = useState(false);

    const onExpandPress = () => {
        LayoutAnimation.configureNext(
            LayoutAnimation.Presets.easeInEaseOut
        );
        setExpanded(true);
    };

    return (
        <View style={styles.container}>
            <TouchableScale
                onPress={onExpandPress}
                style={styles.header}
                activeScale={0.98}
            >
                <Feather
                    color='#C0C2C7'
                    name='clock'
                    size={18}
                />

                <Text style={styles.text}>
                    9:00 - 23:30
                </Text>

                <Feather
                    name='chevron-down'
                    color='#C0C2C7'
                    size={18}
                />
            </TouchableScale>

            {expanded && (
                <View style={styles.timetable}>
                    {timetable.map(({ name, value }, index) => (
                        <View
                            style={styles.row}
                            key={index}
                        >
                            <Text style={[styles.text, styles.day]}>
                                {name}
                            </Text>
                            <Text style={styles.text}>
                                {value}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    )
})

// Constants
const timetable = [
    { name: 'Lundi', value: '9:00 - 23:00' },
    { name: 'Mardi', value: '9:00 - 23:00' },
    { name: 'Mercredi', value: '9:00 - 23:00' },
    { name: 'Jeudi', value: '9:00 - 23:00' },
    { name: 'Vendredi', value: '9:00 - 23:00' },
    { name: 'Samedi', value: 'Fermé' },
    { name: 'Dimanche', value: 'Fermé' },
]

// Styles
const styles = StyleSheet.create({
    container: {
        // ...
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 10,
        fontWeight: '500',
        color: '#C0C2C7',
        fontSize: 16,
    },
    timetable: {
        marginLeft: 30,
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        marginVertical: 2,
    },
    day: {
        width: 80,
    },
})

// Types
export type Props = {
    // ...
}