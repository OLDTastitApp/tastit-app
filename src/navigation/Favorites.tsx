// React
import React from 'react'

// Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import PlaceDetails from '@screens/PlaceDetails'
import Favorites from '@screens/Favorites'


const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator
            initialRouteName='Favorites'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                component={Favorites}
                name='Favorites'
            />
            {/* <Stack.Screen
                component={PlaceDetails}
                name='PlaceDetails'
            /> */}
        </Stack.Navigator>
    )
}