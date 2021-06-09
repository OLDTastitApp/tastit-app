// React
import React, { memo, useState, useRef, useEffect, useMemo } from 'react'

// Components
import { View, Text, FlatList, Animated, StyleSheet } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import FilterTumbnail from './FilterThumbnail'
import { TouchableScale } from '@components'
import Footer from './Footer'

// Utils
import { filters } from './utils'

// Constants
import { font, color } from '@constants'

// Types
import { Props as FilterThumbnailProps } from './FilterThumbnail'
import { ViewProps } from 'react-native'


export default memo((props: Props) => {

    const { current: progress } = useRef(new Animated.Value(0));
    const [height, setHeight] = useState<number>(0);
    const [visible, setVisible] = useState(false);

    useEffect(
        () => {
            if (props.visible) {
                setVisible(true);
            }

            Animated.spring(progress, {
                toValue: +props.visible,
                useNativeDriver: true,
            }).start(() => {
                if (!props.visible) {
                    setVisible(false);
                }
            });
        },
        [props.visible]
    );
    
    const { filter } = props;

    const { translateY, opacity } = useMemo(
        () => {
            const translateY = progress.interpolate({
                outputRange: [height, 0],
                inputRange: [0, 1],
            });

            return { translateY, opacity: progress };
        },
        [height]
    );

    const onLayout: ViewProps['onLayout'] = (event) => {
        setHeight(event.nativeEvent.layout.height);
    };

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    opacity,
                }
            ]}
            onLayout={onLayout}
        >
            <BlurView
                
                blurType='chromeMaterialDark'
                // blurType='extraDark'
                // blurType='dark'
                blurRadius={100}
            >
                <View style={styles.header}>
                    <TouchableScale
                        onPress={props.onRetakePress}
                    >
                        <Text style={styles.take}>
                            Reprendre
                        </Text>
                    </TouchableScale>

                    <TouchableScale
                        onPress={props.onSubmit}
                        style={styles.submit}
                    >
                        <Text style={styles.title}>
                            Suivant
                        </Text>
                    </TouchableScale>
                </View>

                <FlatList
                    renderItem={({ item }) => (
                        <FilterTumbnail
                            selected={item[0] === filter}
                            onPress={props.onChanged}
                            empty={!props.uri}
                            uri={props.uri}
                            item={item}
                        />
                    )}
                    contentContainerStyle={styles.content}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={([name]) => name}
                    decelerationRate={0.3}
                    data={filters}
                    horizontal
                />

                {/* <Footer /> */}
            </BlurView>
        </Animated.View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        bottom: 0,
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 20,
    },
    take: {
        fontFamily: font.semiBold,
        marginHorizontal: 5,
        color: color.light,
        fontSize: 18,
    },
    submit: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 100,
    },
    title: {
        fontFamily: font.bold,
        color: color.dark,
        fontSize: 16,
    },
    content: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
})

// Types
export type Props = {
    onChanged: OnFilterThumbnailPress,
    onRetakePress: () => void,
    onSubmit: () => void,
    visible: boolean,
    filter?: string,
    uri: string,
}

type OnFilterThumbnailPress = FilterThumbnailProps['onPress']