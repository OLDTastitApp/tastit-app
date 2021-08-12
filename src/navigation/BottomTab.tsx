// React
import React from 'react'

// Navigation
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

// Components
import { TabBar, TabBarItem } from '@components'

// Screens
import Favorites from '@screens/Favorites'
// import Profile from '@screens/Profile'
// import Screenshot from './Screenshot'
import Map from '@screens/Map'
// import Home from '@screens/Home'
import Profile from './Profile'
import HomeStack from './Home'

// Constants
import { color } from '@constants'
import { View } from 'react-native'


const Tab = createBottomTabNavigator()

const screenOptions: BottomTabNavigationOptions = {
    // style: {
    //     borderTopColor: 'transparent',
    //     backgroundColor: color.light,
    //     elevation: 0,
    // },
    // keyboardHidesTabBar: true,
    // showLabel: false,
    tabBarShowLabel: false,
    tabBarStyle: {
        borderTopColor: 'transparent',
        backgroundColor: color.light,
        elevation: 0,
    },
    headerShown: false,
}

const Camera = () => (
    <View style={{ flex: 1, backgroundColor: 'red' }} />
)

export default () => (
    <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
        // tabBarOptions={tabBarOptions}
        screenOptions={screenOptions}
        // initialRouteName='Favorites'
        // initialRouteName='Profile'
        // initialRouteName='Screenshot'
        initialRouteName='HomeStack'
    >
        <Tab.Screen
            options={() => ({
                tabBarIcon: ({ focused }) => (
                    <TabBarItem
                        focused={focused}
                        icon='home'
                    />
                ),
            })}
            component={HomeStack}
            name='HomeStack'
        />
        <Tab.Screen
            options={() => ({
                tabBarIcon: ({ focused }) => (
                    <TabBarItem
                        focused={focused}
                        icon='search'
                    />
                ),
            })}
            component={Map}
            name='Map'
        />
        <Tab.Screen
            options={() => ({
                tabBarIcon: ({ focused }) => (
                    <TabBarItem
                        focused={focused}
                        icon='meh'
                    />
                ),
            })}
            component={Favorites}
            name='Favorites'
        />
        <Tab.Screen
            options={() => ({
                tabBarIcon: ({ focused }) => (
                    <TabBarItem
                        focused={focused}
                        icon='camera'
                    />
                ),
            })}
            // component={Screenshot}
            component={Camera}
            name='Camera'
        />
        <Tab.Screen
            options={() => ({
                tabBarIcon: ({ focused }) => (
                    <TabBarItem
                        focused={focused}
                        icon='user'
                    />
                ),
            })}
            component={Profile}
            name='ProfileStack'
        />
    </Tab.Navigator>
)