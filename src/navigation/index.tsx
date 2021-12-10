// React
import React, { useRef, useContext, useEffect } from 'react'

// Utils
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency'
import { Platform } from 'react-native'

// Navigation
import { NavigationContainer, LinkingOptions } from '@react-navigation/native'

// Helpers
import { useNavigationContainerRef } from '@react-navigation/native'
import { AppTrackingContext } from '@helpers/useAppTracking'

// Services
import analytics from '@react-native-firebase/analytics'

// Navigators
import Switch from './Switch'

// Env
import * as env from '@env'


const linking: LinkingOptions<{}> = {
    prefixes: [env.APIUri, 'tastit://'],
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

    const { allowed } = useContext(AppTrackingContext);
    
    return (
        <NavigationContainer
            linking={linking}
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef.getCurrentRoute().name;
                if (allowed) {
                    analytics().logScreenView({
                        screen_class: routeNameRef.current,
                        screen_name: routeNameRef.current,
                    });
                }
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.getCurrentRoute().name;

                if (previousRouteName !== currentRouteName) {
                    if (allowed) {
                        await analytics().logScreenView({
                            screen_class: currentRouteName,
                            screen_name: currentRouteName,
                        });
                    }
                }

                routeNameRef.current = currentRouteName;
            }}
        >
            <Switch />
        </NavigationContainer>
    )
}