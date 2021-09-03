// React
import React from 'react'

// Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import Profile from '@screens/Profile'
import Map from '@screens/Map'


const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator
            initialRouteName='Map'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                component={Map}
                name='Map'
            />
            <Stack.Screen
                component={Profile}
                name='Profile'
            />
        </Stack.Navigator>
    )
}