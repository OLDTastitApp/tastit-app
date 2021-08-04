// React
import React, { useState, useEffect, useRef, memo } from 'react'

// Components
import { View, FlatList, Text, StyleSheet } from 'react-native'
import Animated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    Extrapolate,
    interpolate,
    multiply,
    add,
} from 'react-native-reanimated'
import FrontItem from '../FancyTabs/FrontItem'
import BackItem from '../FancyTabs/BackItem'

// Helpers
import { useWindowDimensions } from 'react-native'

// Utils
import TextSize from 'react-native-text-size'

// Constants
import { color, font } from '@constants'


const AwesomeTabs = <TItem,>(props: Props<TItem>) => {

    // const wrapperX = Animated.add(
    //     Animated.multiply(-1, this.scrollX),
    //     this.itemScrollX
    // );

    // const contentX = Animated.multiply(
    //     -1, this.itemScrollX
    // );

    // const { scrollX } = props;

    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    }, [scrollX]);

    const [state, setState] = useState<State<TItem>>();
    const { data, sizes } = state ?? {};

    // const [data, setData] = useState<TItem[]>();
    // const [sizes, setSizes] = useState<{ width: number, height: number }[]>();
    // const widthsRef = useRef<number[]>();
    // const { current: widths } = widthsRef;

    useEffect(
        () => {
            if (!(props.data?.length > 0)) {
                setState({ data: undefined, sizes: undefined });
                return;
            }

            (async () => {
                const sizes = [];
                // sizesRef.current = [];
        
                for (let section of props.data) {
                    
                    const size = await TextSize.measure({
                        text: (section as any).name,
                        fontFamily: 'Avenir Next',
                        fontWeight: '500',
                        fontSize: 16,
                    });

                    // 2 * paddingHorizontal (15) = 30
                    const width = size.width + 30;

                    sizes.push({ ...size, width });
                }

                setState({ data: props.data, sizes });

                // if (sizes.length > 0) {
                //     this.cursorWidth.setValue(sizes[0].width + 40);
                // }
            })();
        },
        [props.data]
    );

    // if (data === undefined) {
    //     return null;
    // }

    const wrapperStyle = useAnimatedStyle(
        () => {
            if (!sizes) return {};

            // const wrapperX = multiply(-1, scrollX.value);

            // const kkk = sizes.map(v => v);
            // for (let i = 1; i < kkk.length; i++) {
            //     kkk[]
            // }
            const sums = sizes.reduce(
                (sums, value, index) => {
                    const sum = (sums?.[index - 1] ?? 0) + (sizes?.[index - 1]?.width ?? 0);
                    return [...sums, sum + 10];
                },
                []
            );

            const sum = interpolate(
                props.scrollX.value,
                sizes.map((_, i) => i * props.pageWidth),
                // sizes.map(({ width }) => width),
                sums,
                Extrapolate.CLAMP,
            );

            return {
                // backgroundColor: '#00ff0055',
                transform: [
                    // { translateX: wrapperX },
                    { translateX: -1 * scrollX.value + sum - 5 },
                    // { translateX: -1 * scrollX.value + sum - 10 },
                    // { translateX: -400 },
                ],
            };
        },
        [
            props.pageWidth,
            props.scrollX,
            sizes,
        ]
    );

    const cusorStyle = useAnimatedStyle(
        () => {
            if (!sizes) return {};

            // const inputs = sizes.map(({ width }) => width);
            // console.log(`inputs: ${JSON.stringify(inputs, null, 4)}`);
            // const outputs = sizes.map((_, i) => i * props.pageWidth);
            // console.log(`outputs: ${JSON.stringify(outputs, null, 4)}`);
            const width = interpolate(
                props.scrollX.value,
                sizes.map((_, i) => i * props.pageWidth),
                sizes.map(({ width }) => width),
                Extrapolate.CLAMP,
            );

            // margin: 5
            return { width, transform: [{ translateX: 0 }] };
        },
        [
            props.pageWidth,
            props.scrollX,
            sizes,
        ]
    );

    const contentStyle = useAnimatedStyle(
        () => {
            if (!sizes) return {};

            // const wrapperX = multiply(-1, scrollX.value);

            // const kkk = sizes.map(v => v);
            // for (let i = 1; i < kkk.length; i++) {
            //     kkk[]
            // }
            const sums = sizes.reduce(
                (sums, value, index) => {
                    const sum = (sums?.[index - 1] ?? 0) + (sizes?.[index - 1]?.width ?? 0);
                    return [...sums, sum + 10];
                },
                []
            );

            const sum = interpolate(
                props.scrollX.value,
                sizes.map((_, i) => i * props.pageWidth),
                // sizes.map(({ width }) => width),
                sums,
                Extrapolate.CLAMP,
            );

            return {
                // backgroundColor: '#00ff0055',
                transform: [
                    // { translateX: wrapperX },
                    { translateX: -sum + 5 },
                    // { translateX: -400 },
                    // { translateX: -props.scrollX.value },
                ],
            };
        },
        [
            props.pageWidth,
            props.scrollX,
            sizes,
        ]
    );

    return (
        <View style={styles.container}>
            <View>

                <AnimatedFlatList
                    renderItem={({ item, index }) => (
                        // <Text>
                        //     {(item as any)?.name}
                        // </Text>
                        <BackItem
                            item={item as any}
                            index={index}
                        />
                    )}
                    contentContainerStyle={styles.padding}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={({ id }) => id}
                    scrollEventThrottle={16}
                    onScroll={onScroll}
                    data={props.data}
                    horizontal
                />

                {/* <Animated.FlatList
                    contentContainerStyle={styles.padding}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'
                    renderItem={this.renderBackItem}
                    keyExtractor={({ id }) => id}
                    ref={this.flatListRef as any}
                    scrollEventThrottle={16}
                    onScroll={this.onScroll}
                    data={data}
                    horizontal
                /> */}

                {sizes?.length > 0 && (
                    <Animated.View
                        style={[
                            styles.wrapper,
                            wrapperStyle,
                            // {
                            //     transform: [
                            //         // { translateX: wrapperX },
                            //     ],
                            // }
                        ]}
                        // pointerEvents='none'
                    >
                        <Animated.View
                            style={[
                                // { width: 100 },
                                // { width: this.cursorWidth },
                                // color && { backgroundColor: color },
                                // { backgroundColor: 'red' },
                                styles.cursor,
                                cusorStyle,
                                // { width: 300 }
                            ]}
                        >
                            <Animated.View
                                style={[
                                    styles.content,
                                    contentStyle,
                                    // { opacity: 0.5 }
                                    // {
                                    //     transform: [
                                    //         // { translateX: contentX },
                                    //         // { translateX: -20 },
                                    //     ],
                                    // }
                                ]}
                            >
                                {data.map((item, index) => (
                                    // this.renderFrontItem({ item, index })
                                    <FrontItem
                                        size={sizes[index]}
                                        item={item as any}
                                        key={index}
                                    />
                                ))}
                            </Animated.View>
                        </Animated.View>
                    </Animated.View>
                )}

            </View>
        </View>
    )
}

export default memo(AwesomeTabs) as typeof AwesomeTabs

// Components
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'purple',
        marginBottom: 20,
        marginTop: 30,
        // flex: 1,
    },
    padding: {
        paddingHorizontal: 20,
    },
    wrapper: {
        paddingHorizontal: 20,
        position: 'absolute',
    },
    cursor: {
        // backgroundColor: '#171717',
        backgroundColor: color.dark,
        // backgroundColor: 'red',
        overflow: 'hidden',
        borderRadius: 200,
        // opacity: 0.5,
    },
    content: {
        // backgroundColor: 'green',
        flexDirection: 'row',
    },
})

export type Props<TItem> = {
    measureWidth?: (item: TItem) => number,
    scrollX?: Animated.SharedValue<number>
    renderFrontItem?: RenderItem<TItem>,
    renderBackItem?: RenderItem<TItem>,
    onChange?: OnChange<TItem>,
    frontColor?: string,
    backColor?: string,
    pageWidth?: number,
    data: TItem[],
}

type OnChange<TItem> = (event: {
    index: number,
    item: TItem,
}) => void

type RenderItem<TItem> = (info: {
    index: number,
    size: number,
    item: TItem,
}) => void

type State<TItem> = {
    sizes: {
        height: number,
        width: number,
    }[],
    data: TItem[],
}