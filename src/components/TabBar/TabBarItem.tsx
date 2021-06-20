// React
import React, { memo } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import TouchableScale from '../TouchableScale'
import { View, StyleSheet } from 'react-native'

import SearchIcon from '@assets/images/search.svg'
import CameraIcon from '@assets/images/camera.svg'
import MainIcon from '@assets/images/main.svg'
import UserIcon from '@assets/images/user.svg'
import HomeIcon from '@assets/images/home.svg'

// Constants
import { color } from '@constants'

// Types
import { BottomTabNavigationOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs'


export default memo((props: Props) => {

    const { route, focused } = props;

    const { Icon } = iconMap[route.name];

    const onLongPress = () => {
        props.onLongPress?.({ route, focused });
    };

    const onPress = () => {
        props.onPress?.({ route, focused });
    };

    return (
        <TouchableScale
            onLongPress={onLongPress}
            style={[
                styles.container,
                route.name === 'Favorites' && styles.main,
            ]}
            disabled={focused}
            activeScale={0.95}
            onPress={onPress}
        >
            {route.name === 'Favorites' ? (
                <Icon
                    // fill={focused ? color.primary : `${color.primary}22`}
                    // fill={focused ? color.primary : `${color.darkGray}`}
                    fill={focused ? color.primary : `${color.dark}`}
                    // name={name}
                    // size={70}
                    height={120}
                />
                // <View style={{
                //     backgroundColor: 'white',
                //     borderRadius: 70,
                //     height: 70,
                //     width: 70,
                // }}
                // />
            ) : (
                <Icon
                    fill={focused ? color.primary : `${color.light}`}
                    // size={30}
                    height={26}
                    width={26}
                />
            )}
        </TouchableScale>
    )
})

// Constants
const iconMap: {
    [route: string]: {
        Icon: any,
    },
} = {
    'Home': {
        Icon: HomeIcon,
    },
    'Map': {
        Icon: SearchIcon,
    },
    'Favorites': {
        Icon: MainIcon,
    },
    // 'Screenshot': {
    //     Icon: CameraIcon,
    // },
    'Camera': {
        Icon: CameraIcon,
    },
    // 'Profile': {
    //     Icon: UserIcon,
    // },
    'ProfileStack': {
        Icon: UserIcon,
    },
}

// Styles
const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 30,
        // backgroundColor: 'red',
        // height: 30,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        width: 70,
        bottom: 10,
    },
})

// Types
export type Props = {
    onLongPress: (event: Event) => void,
    onPress: (event: Event) => void,
    focused?: boolean,
    route: Route,
}

export type Event = {
    focused: boolean,
    route: Route,
}

export type Route = BottomTabBarProps['state']['routes'][0]