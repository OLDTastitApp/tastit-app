// React
import React from 'react'

// Navigation
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import EditProfile from '@screens/EditProfile'
import Favorites from '@screens/Favorites'
import Settings from '@screens/Settings'
import Profile from '@screens/Profile'


// const Stack = createNativeStackNavigator()
const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                component={Profile}
                name='Profile'
            />
            <Stack.Screen
                component={Settings}
                name='Settings'
            />
            <Stack.Screen
                component={EditProfile}
                name='EditProfile'
            />
            <Stack.Screen
                component={Favorites}
                name='Favorites'
            />
        </Stack.Navigator>
    )
}