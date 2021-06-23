// React
import React from 'react'

// Navigation
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import SelectEstablishment from '@screens/SelectEstablishment'
import SelectFriends from '@screens/SelectFriends'
import CreatePost from '@screens/CreatePost'
import Screenshot from '@screens/Screenshot'


// const Stack = createNativeStackNavigator()
const Stack = createStackNavigator()

export default () => (
    <Stack.Navigator
        initialRouteName='Screenshot'
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen
            component={Screenshot}
            name='Screenshot'
        />
        <Stack.Screen
            component={CreatePost}
            name='CreatePost'
        />
        <Stack.Screen
            component={SelectEstablishment}
            name='SelectEstablishment'
        />
        <Stack.Screen
            component={SelectFriends}
            name='SelectFriends'
        />
    </Stack.Navigator>
)