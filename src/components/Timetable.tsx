// React
import React, { memo, useState, useMemo } from 'react'

// Components
import { View, Text, StyleSheet, LayoutAnimation } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import TouchableScale from './TouchableScale'

// Utils
import moment from 'moment'

// Types
import { ViewStyle, StyleProp } from 'react-native'


export default memo((props: Props) => {

    const { timetable } = props;
    // const timetable = [];

    const [expanded, setExpanded] = useState(false);

    const onExpandPress = () => {
        LayoutAnimation.configureNext(
            LayoutAnimation.Presets.spring
        );
        setExpanded(expanded => !expanded);
    };

    // return null;
    // if (timetable.length === 0) return null;

    const { data, currentHours } = useMemo(
        () => {
            if (timetable.length === 0) return {};

            const data = [
                { name: 'Dimanche', intervals: [] },
                { name: 'Lundi', intervals: [] },
                { name: 'Mardi', intervals: [] },
                { name: 'Mercredi', intervals: [] },
                { name: 'Jeudi', intervals: [] },
                { name: 'Vendredi', intervals: [] },
                { name: 'Samedi', intervals: [] },
            ];
        
            const format = (value: number) => {
                const h = Math.floor(value / 60);
                const mm = `${value % 60}`.padStart(2, '0');
                return `${h}:${mm}`;
            }
        
            for (let i = 0; i < 7; i++) {
                const endOfDay = (i + 1) * 24 * 60;
                const startOfDay = i * 24 * 60;
        
                for (const [start, end] of timetable) {
                    if (start >= startOfDay && end < endOfDay) {
                        data[i].intervals.push(
                            `${format(start - startOfDay)} - ${format(end - startOfDay)}`
                        );
                    }
                }

                if (data[i].intervals.length === 0) {
                    data[i].intervals.push('Fermé');
                }
            }

            const startOfDay = new Date().getDay() * 24 * 60;
            const currentInterval = timetable
                .find(([start, end]) => {
                    const elapsedMinutes =  (
                        new Date().getTime()
                        - moment().startOf('day').toDate().getTime()
                    ) / 60000;
                    const current = startOfDay + elapsedMinutes;
                    return current >= start && current < end;
                });

            const currentHours = currentInterval
                ? `${format(currentInterval[0] - startOfDay)} - ${format(currentInterval[1] - startOfDay)}`
                : 'Fermé';

            return { data, currentHours };
        },
        [timetable]
    );

    return (
        <View style={props.style}>
            <TouchableScale
                onPress={onExpandPress}
                style={styles.header}
                activeScale={0.99}
            >
                <Feather
                    color='#C0C2C7'
                    name='clock'
                    size={18}
                />

                <Text style={styles.text}>
                    {currentHours}
                </Text>

                <Feather
                    name='chevron-down'
                    color='#C0C2C7'
                    size={18}
                />
            </TouchableScale>

            {expanded && (
                <View style={styles.timetable}>
                    {data?.map(({ name, intervals }, i) => (
                        <View
                            style={styles.row}
                            key={i}
                        >
                            <Text style={[styles.text, styles.day]}>
                                {name}
                            </Text>
                            <View>
                                {intervals.map((interval, j) => (
                                    <Text
                                        style={[
                                            styles.text,
                                            j > 0 && { marginTop: 2 }
                                        ]}
                                        key={j}
                                    >
                                        {interval}
                                    </Text>
                                ))}
                                {/* <Text style={styles.text}>
                                    {value}
                                </Text>
                                <View style={{
                                    width: 100,
                                    height: 30,
                                    backgroundColor: 'red',
                                    marginTop: 0,
                                }} /> */}
                            </View>
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
    header: {
        marginHorizontal: 20,
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
        marginVertical: 4,
    },
    day: {
        width: 80,
    },
})

// Types
export type Props = {
    timetable: [number, number][],
    style?: StyleProp<ViewStyle>,
}