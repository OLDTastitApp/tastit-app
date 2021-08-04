// React
import React, { PureComponent, createRef } from 'react'

// Components
import { View, Animated, FlatList, StyleSheet } from 'react-native'
import FrontItem from './FrontItem'
import BackItem from './BackItem'

// Utils
// import TextSize from '../../utils/text'
import TextSize from 'react-native-text-size'

// Constants
import { font } from '@constants'

// Constants
const PADDING_HORIZONTAL = 20;


export default class FancyTabs extends PureComponent<Props, State> {

    static defaultProps: Partial<Props>

    // Refs
    private flatListRef = createRef<Animated<FlatList<any>>>()

    cursorWidth = new Animated.Value(0)
    itemScrollX = new Animated.Value(0)
    scrollX = new Animated.Value(0)

    onScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: {
                        x: this.scrollX,
                    },
                },
            }
        ],
        {
            useNativeDriver: true,
        }
    )

    state = { loaded: false, sizes: [] }

    componentDidMount() {
        this.resetSizes();
    }

    // componentDidUpdate() {
    //     this.resetSizes();
    // }

    async resetSizes() {

        let sizes = [];
        
        for (let section of this.props.data) {
            
            const size = await TextSize.measure({
                // fontFamily: 'SFCompactRounded-Regular',
                fontFamily: font.regular,
                text: section.name,
                // fontSize: 20,
                fontSize: 16,
            });

            sizes.push(size);
        }

        if (sizes.length > 0) {
            this.cursorWidth.setValue(sizes[0].width + 40);
        }

        console.log(`sizes: ${JSON.stringify(sizes, null, 4)}`)

        this.setState({ sizes, loaded: true });
    }

    scrollToItem = (index: number) => {
        // this.flatListRef.current?.getNode().scrollToIndex({
        //     index, animated: true, viewPosition: 0.5,
        // });
        this.flatListRef.current?.scrollToIndex({
            index, animated: true, viewPosition: 0.5,
        });
        this.moveCursor(index);
    }

    private moveCursor = (index: number) => {
        const { sizes, loaded } = this.state;

        if (!loaded) return;

        const padding = 2 * PADDING_HORIZONTAL;
        let toValue = padding * index;

        for (let i = 0; i < index; i++) {
            toValue += sizes[i].width;
        }

        Animated.parallel([
            Animated.spring(this.itemScrollX, {
                useNativeDriver: true, toValue,
            }),
            Animated.spring(this.cursorWidth, {
                toValue: sizes[index].width + padding,
                // useNativeDriver: true,
                useNativeDriver: false,
            }),
        ]).start();
    }

    handlePress = ({ item, index }) => {
        // this.flatListRef.current?.getNode().scrollToIndex({
        //     viewPosition: 0.5, /*viewOffset: 20*/ animated: true, index,
        // });
        this.flatListRef.current?.scrollToIndex({
            viewPosition: 0.5, /*viewOffset: 20*/ animated: true, index,
        });
        this.moveCursor(index);
        this.props.onChange({ item, index });
    }

    renderBackItem = ({ item, index }) => (
        <BackItem
            onPress={this.handlePress}
            index={index}
            item={item}
        />
    )

    renderFrontItem = ({ item, index }) => (
        <FrontItem
            size={this.state.sizes[index]}
            color={this.props.color}
            key={item.id}
            item={item}
        />
    )

    render() {
        const { sizes } = this.state;
        const { data, color } = this.props;

        const wrapperX = Animated.add(
            Animated.multiply(-1, this.scrollX),
            this.itemScrollX
        );

        const contentX = Animated.multiply(
            -1, this.itemScrollX
        );

        return (
            <View style={styles.container}>
                <View>

                    <Animated.FlatList
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
                    />

                    {sizes.length > 0 && (
                        <Animated.View
                            style={[
                                styles.wrapper,
                                {
                                    transform: [
                                        { translateX: wrapperX },
                                    ],
                                }
                            ]}
                            pointerEvents='none'
                        >
                            <Animated.View
                                style={[
                                    { width: this.cursorWidth },
                                    color && { backgroundColor: color },
                                    styles.cursor,
                                ]}
                            >
                                <Animated.View
                                    style={[
                                        styles.content,
                                        {
                                            transform: [
                                                { translateX: contentX },
                                            ],
                                        }
                                    ]}
                                >
                                    {data.map((item, index) => (
                                        this.renderFrontItem({ item, index })
                                    ))}
                                </Animated.View>
                            </Animated.View>
                        </Animated.View>
                    )}

                </View>
            </View>
        )
    }
}

FancyTabs.defaultProps = {
    onChange: () => {},
}

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'blue',
        marginBottom: 20,
        flex: 1,
    },
    padding: {
        paddingHorizontal: PADDING_HORIZONTAL,
    },
    wrapper: {
        paddingHorizontal: PADDING_HORIZONTAL,
        position: 'absolute',
    },
    cursor: {
        // backgroundColor: '#171717',
        // backgroundColor: 'red',
        overflow: 'hidden',
        borderRadius: 200,
    },
    content: {
        // backgroundColor: 'green',
        flexDirection: 'row',
    },
})

// Types
type State = {
    loaded: boolean,
    sizes: {
        width: number,
    }[],
}

export type Props = {
    onChange: (event: {
        index: number,
        item: Item,
    }) => void,
    color?: string,
    data: Item[],
}

type Item = {
    name: string,
    id: string,
}

// type Animated<K> = {
//     getNode: () => K,
// }
type Animated<K> = K