// React
import React, { useRef } from 'react'

// Navigation
import { NavigationContainer, LinkingOptions } from '@react-navigation/native'

// Helpers
import { useNavigationContainerRef } from '@react-navigation/native'

// Services
import analytics from '@react-native-firebase/analytics'

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
            BottomTab: {
                screens: {
                    FavoritesStack: {
                        screens: {
                            'Favorites': 'favorite/:id',
                        },
                    },
                },
            },
            'PlaceDetails': 'place/:placeId',
            'PostDetails': 'post/:id',
        },
    },
}

export default () => {

    const navigationRef = useNavigationContainerRef();
    const routeNameRef = useRef<string>();
    
    return (
        <NavigationContainer
            linking={linking}
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef.getCurrentRoute().name;
                analytics().logScreenView({
                    screen_class: routeNameRef.current,
                    screen_name: routeNameRef.current,
                });
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.getCurrentRoute().name;

                if (previousRouteName !== currentRouteName) {
                    await analytics().logScreenView({
                        screen_class: currentRouteName,
                        screen_name: currentRouteName,
                    });
                }

                routeNameRef.current = currentRouteName;
            }}
        >
            <Switch />
        </NavigationContainer>
    )
}