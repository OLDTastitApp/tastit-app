// React
import React, { memo, useCallback, useRef, useEffect, useMemo } from 'react'

// Components
import { View, Animated, StyleSheet, Dimensions } from 'react-native'
// import { BoxShadow } from 'react-native-shadow'
import TabBarItem from './TabBarItem'

// Helpers
import { useNavigation } from '@react-navigation/native'

// Constants
import { ui, color } from '@constants'

// Types
import { BottomTabNavigationOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Props as TabBarItemProps } from './TabBarItem'


export default memo((props: Props) => {

    const { state, descriptors, navigation } = props;

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    const route = state.routes[state.index];
    // console.log(`-- current: ${route.name} (${state.index})`);
    // if (state.index > 0) {
    //     const proute = state.routes[state.index - 1];
    //     // console.log(`   previous: ${proute.name} (${state.index - 1})`);
    //     // console.log(`   previous: ${state.history.map(h => h.key)}`);
    // }

    // const n = useNavigation();

    // useEffect(
    //     () => {
    //         if (route.name === 'Search' && state.history.length > 1) {
    //             const { key } = state.history[state.history.length - 2];
    //             // const previousRoute = state.routes[state.index - 1];
    //             // const previousKey = state.history.
    //             const [_, previousName] = key.match(/(\w+)-.*$/);
    //             console.log(`previous route: ${previousName}`);
    //             const callback = n.addListener('beforeRemove', e => {
    //                 e.preventDefault();
    //                 navigation.navigate(previousName);
    //             });
    //             return n.removeListener('beforeRemove', callback);
    //             // navigation.
    //         }
    //     },
    //     [route.name === 'Search']
    // );


    const { current: hiddenProgress } = useRef(new Animated.Value(0));

    // On nested routes
    const hidden = route.state?.index > 0
        || focusedOptions.tabBarVisible === false
        || route.name === 'Screenshot'
        || route.name === 'Map';
        // || route.name === 'Search';

    // const delay = route.name === 'Search' ? 1000 : 0;
    const delay = route.name === 'Map' ? 1000 : 0;

    useEffect(
        () => {
            Animated.spring(hiddenProgress, {
                useNativeDriver: true,
                toValue: +hidden,
                // delay,
            }).start();
        },
        [hidden]
    );

    const { translateY, opacity, scale } = useMemo(
        () => {
            const translateY = hiddenProgress.interpolate({
                outputRange: [0, safeHeight],
                inputRange: [0, 1],
            });
            const scale = hiddenProgress.interpolate({
                outputRange: [1, 0.5],
                inputRange: [0, 1],
            });
            const opacity = hiddenProgress.interpolate({
                outputRange: [1, 0.5],
                inputRange: [0, 1],
            });
            return { translateY, opacity, scale };
        },
        []
    );

    // Handlers
    const onLongPress = useCallback<OnLongPress>(
        ({ route }) => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
        },
        []
    );

    const onPress = useCallback<OnPress>(
        ({ route, focused }) => {
            if (route.name === 'Camera') {
                return navigation.navigate('Screenshot');
            }

            const event = navigation.emit({
                canPreventDefault: true,
                target: route.key,
                type: 'tabPress',
            });

            if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
        },
        []
    );

    // return (
    //     <View style={{
    //         backgroundColor: 'red',
    //         height: 70,
    //         width: 200,
    //     }} />
    // )

    return (
        <Animated.View
            style={[
                {
                    opacity,
                    transform: [
                        { translateY },
                        { scale },
                    ],
                },
                styles.container,
            ]}
            pointerEvents='box-none'
        >
            {/* <View
                style={styles.shadow}
                pointerEvents='none'
            >
                <BoxShadow setting={setting} />
            </View> */}
            
            <View style={styles.content}>
                {state.routes.map((route, index) => (
                    <TabBarItem
                        focused={state.index === index}
                        onLongPress={onLongPress}
                        onPress={onPress}
                        route={route}
                        key={index}
                    />
                ))}
            </View>

        </Animated.View>
    )
})

// Constants
const safeHeight = ui.safePaddingBottom + 50
const { width: w, height: h } = Dimensions.get('window')
const width = Math.min(w, h)

const setting = {
    width: width - 40,
    opacity: 0.04,
    color: '#000',
    border: 50,
    height: 50,
    radius: 10,
    x: 0,
    y: 2,
}

// Styles
const styles = StyleSheet.create({
    container: {
        marginBottom: ui.safePaddingBottom,
        position: 'absolute',
        marginHorizontal: 30,
        // borderRadius: 5,
        height: 50,
        bottom: 0,
        right: 0,
        left: 0,
    },
    shadow: {
        position: 'absolute',
        bottom: 0,
    },
    content: {
        justifyContent: 'space-around',
        // backgroundColor: 'white',
        backgroundColor: color.dark,
        flexDirection: 'row',
        alignItems: 'center',
        // overflow: 'hidden',
        borderRadius: 10,
        height: 50,
    },
})

// Types
// export type Props = BottomTabBarProps<BottomTabNavigationOptions>
export type Props = BottomTabBarProps

type OnLongPress = TabBarItemProps['onLongPress']

type OnPress = TabBarItemProps['onPress']