// React
import React from 'react'

// Navigation
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import PlaceDetails from '@screens/PlaceDetails'
import PostDetails from '@screens/PostDetails'
import AddPlace from '@screens/AddPlace'
import Screenshot from './Screenshot'
import BottomTab from './BottomTab'
import Auth from './Auth'

// Apollo
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


// const Stack = createNativeStackNavigator()
const Stack = createStackNavigator()

export default () => {

    const { data: { authenticated } } = useQuery<
        graph.AuthenticatedResult
    >(graph.AUTHENTICATED);
    // const authenticated = true;

    return (
        <Stack.Navigator
            initialRouteName='BottomTab'
            screenOptions={{
                headerShown: false,
            }}
        >
            {!authenticated ? (
                <Stack.Screen
                    component={Auth}
                    name='AuthStack'
                />
            ) : (
                <>
                    <Stack.Screen
                        component={BottomTab}
                        name='BottomTab'
                    />
                    <Stack.Screen
                        component={Screenshot}
                        name='ScreenshotStack'
                    />
                    <Stack.Screen
                        component={AddPlace}
                        name='AddPlace'
                    />
                </>
            )}
            <Stack.Screen
                component={PostDetails}
                name='PostDetails'
            />
            <Stack.Screen
                component={PlaceDetails}
                name='PlaceDetails'
            />
        </Stack.Navigator>
    )
}