// React
import React from 'react'

// Navigation
import { NavigationContainer, LinkingOptions } from '@react-navigation/native'

// Navigators
import Switch from './Switch'


const linking: LinkingOptions<{}> = {
    prefixes: ['tastit://'],
    config: {
        screens: {
            AuthStack: {
                screens: {
                    'VerifyEmail': 'verify/email',
                },
            },
            'PostDetails': 'post/:id',
        },
    },
}

export default () => (
    <NavigationContainer
        linking={linking}
    >
        <Switch />
    </NavigationContainer>
)