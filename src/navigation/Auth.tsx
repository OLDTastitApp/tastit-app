// React
import React from 'react'

// Navigation
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import SignUp from '@screens/SignUp'
import LogIn from '@screens/LogIn'
import Auth from '@screens/Auth'


// const Stack = createNativeStackNavigator()
const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator
            initialRouteName='Auth'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                component={Auth}
                name='Auth'
            />
            <Stack.Screen
                component={SignUp}
                name='SignUp'
            />
            <Stack.Screen
                component={LogIn}
                name='LogIn'
            />
        </Stack.Navigator>
    )
}