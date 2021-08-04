// React
import React, { memo, useState, useMemo } from 'react'
import Animated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    interpolateColors,
} from 'react-native-reanimated'
import { FlatList, Text, StyleSheet, Dimensions } from 'react-native'
import AwesomeTabs from '@components/AwesomeTabs'

// Components
import { View } from 'react-native'


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export default memo(() => {

    const [index, setIndex] = useState(0);

    const [tabs, setTabs] = useState([
        { id: '0', name: 'Fast-foods' },
        { id: '1', name: 'Traiteurs' },
        { id: '2', name: 'Chicken' },
        { id: '3', name: 'Kebab' },
        { id: '4', name: 'Italiens' },
    ]);

    // React.useEffect(
    //     () => {
    //         setTimeout(() => {
    //             setTabs(tabs => [...tabs, { id: `${tabs.length + 1}`, name: 'BBBBBB' },]);
    //         }, 5000);
    //     },
    //     []
    // );

    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    }, []);

    const kkk = useAnimatedStyle(
        () => {
            const w = interpolate(
                scrollX.value,
                [0, width, 2 * width],
                [100, 200, 300],
            );
            // const backgroundColor = interpolateColors(translateX.value, {
            //     inputRange: [0, width, 2 * width],
            //     outputColorRange: ['#ff0000', '#ffff00', '#000000'],
            // });
            // console.log(`value: ${w}`)
            return {
                // backgroundColor,
                width: w,
            };
        },
        []
    );

    return (
        <View style={{ flex: 1, paddingTop: 40 }}>

            <AwesomeTabs
                // renderFrontItem={({ item }) => (
                //     null
                // )}
                pageWidth={width}
                scrollX={scrollX}
                data={tabs}
            />

            {/* <Animated.View style={[kkk, {
                // height: 100,
                width: 100,
                backgroundColor: 'blue',
                // alignItems: 'flex-start',
                alignSelf: 'flex-start',
            }]}>
                <Text>
                    AAAA
                </Text>
            </Animated.View> */}
            
            <AnimatedFlatList
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate='fast'
                // snapToInterval={width}
                onScroll={onScroll}
                pagingEnabled
                horizontal
                style={{
                    flex: 1,
                }}
                keyExtractor={({ id }) => id}
                data={tabs}
                renderItem={({ }) => (
                    <View style={[styles.page, { backgroundColor: '#' + Math.random().toString(16).substr(-6) }]} />
                )}
            >
                {/* <View style={[styles.page, { backgroundColor: 'green' }]} />
                <View style={[styles.page, { backgroundColor: 'blue' }]} /> */}
            </AnimatedFlatList>

            {/* <Text>
                AAAAA
            </Text> */}

        </View>
    )
})

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    page: {
        height: '100%',
        width,
    },
})