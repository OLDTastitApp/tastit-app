// React
import React, { memo } from 'react'

// Components
import { View, Animated, Text, Image, StatusBar, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import SendIcon from '@assets/icons/send.svg'
import { TouchableScale } from '@components'

// Helpers
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Types
import { User } from '@types'


export default memo((props: Props) => {

    const { listCount, canGoBack, scrollY, myself, user } = props;

    const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;

    const userUrl = user?.picture?.url;

    const edges = useSafeAreaInsets();
    const fullHeight = edges.top + 90;

    const scaleHeader = scrollY.interpolate({
        outputRange: [1 + 200 / fullHeight, 1],
        extrapolateRight: 'clamp',
        inputRange: [-100, 0],
    });

    const translatePictureY = scrollY.interpolate({
        outputRange: [0, -50 / 2, -75],
        inputRange: [0, 50, 100],
        extrapolate: 'clamp',
    });

    const scalePicture = scrollY.interpolate({
        outputRange: [1, 0.625],
        extrapolate: 'clamp',
        inputRange: [0, 30],
    });

    const translatePictureWrapperY = scrollY.interpolate({
        extrapolateRight: 'clamp',
        outputRange: [100, 0],
        inputRange: [-100, 0],
    });

    const coverOpacity = scrollY.interpolate({
        outputRange: [0.9, 0, 0.9],
        inputRange: [-230, 0, 150],
        extrapolate: 'clamp',
    });

    const translateHeaderY = scrollY.interpolate({
        outputRange: [0, -50],
        extrapolate: 'clamp',
        inputRange: [0, 50],
    });

    const contentOpacity = scrollY.interpolate({
        inputRange: [0, 80, 150],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={styles.container}>

            <StatusBar barStyle='light-content' />

            <Animated.View
                style={{
                    transform: [
                        { scale: scaleHeader },
                        { translateY: translateHeaderY },
                    ],
                }}
            >
                <Image
                    style={[{ height: fullHeight }]}
                    source={{ uri: coverUrl }}
                    // style={styles.cover}
                />

                <Animated.Image
                    style={[
                        { opacity: coverOpacity },
                        StyleSheet.absoluteFill,
                        { height: fullHeight },
                    ]}
                    source={{ uri: coverUrl }}
                    blurRadius={80}
                />
            </Animated.View>

            <Animated.View
                style={[
                    styles.wrapper,
                    {
                        transform: [
                            { translateY: translatePictureWrapperY },
                        ],
                    },
                ]}
            >
                {!!userUrl ? (
                    <Animated.Image
                        source={{ uri: userUrl }}
                        style={[
                            styles.picture,
                            {
                                transform: [
                                    { translateY: translatePictureY },
                                    { scale: scalePicture },
                                ],
                            },
                        ]}
                    />
                ) : (
                    <Animated.View
                        style={[
                            styles.picture,
                            {
                                // backgroundColor: 'red',
                                backgroundColor: '#f2f2f2',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transform: [
                                    { translateY: translatePictureY },
                                    { scale: scalePicture },
                                ],
                            },
                        ]}
                    >
                        <Text style={{ fontSize: 40 }}>
                            👽
                        </Text>
                    </Animated.View>
                )}
            </Animated.View>

            <View
                style={[
                    styles.bar,
                    {
                        top: edges.top - 10,
                    },
                ]}
            >
                {(!myself || canGoBack) ? (
                    <TouchableScale
                        onPress={props.onBackPress}
                        style={styles.button}
                    >
                        <Feather
                            name='arrow-left'
                            color='white'
                            size={30}
                        />
                    </TouchableScale>
                ) : (
                    <View style={styles.button} />
                )}

                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: contentOpacity,
                        },
                    ]}
                >
                    <Text style={styles.name}
                        numberOfLines={1}
                    >
                        {fullName}
                    </Text>

                    <Text style={styles.count}
                        numberOfLines={1}
                    >
                        {listCount} listes
                    </Text>
                </Animated.View>

                {!myself ? (
                    <TouchableScale
                        onPress={props.onSharePress}
                        style={styles.button}
                    >
                        <SendIcon
                            fill='white'
                            height={26}
                            width={26}
                        />
                    </TouchableScale>
                ) : (
                    <View style={styles.button} />
                )}
            </View>
        </Animated.View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
    },
    bar: {
        justifyContent: 'space-between',
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    content: {
        marginHorizontal: 20,
        alignItems: 'center',
        flex: 1,
    },
    name: {
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    count: {
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        color: 'white',
        opacity: 0.8,
        fontSize: 12,
    },
    wrapper: {
        position: 'absolute',
        overflow: 'hidden',
        paddingTop: 10,
        bottom: -40,
    },
    picture: {
        borderColor: 'white',
        borderRadius: 80,
        marginLeft: 20,
        borderWidth: 3,
        height: 80,
        width: 80,
    },
    button: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 50,
        height: 50,
        width: 50,
    },
})

// Types
type Props = {
    onSharePress: () => void,
    onBackPress: () => void,
    scrollY: Animated.Value,
    canGoBack?: boolean,
    listCount: number,
    myself?: boolean,
    user: User,
}

//#region URL
const coverUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
//#endregion