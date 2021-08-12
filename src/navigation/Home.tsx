// React
import React from 'react'

// Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import Profile from '@screens/Profile'
import Home from '@screens/Home'


const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                component={Home}
                name='Home'
            />
            <Stack.Screen
                component={Profile}
                name='Profile'
            />
        </Stack.Navigator>
    )
}