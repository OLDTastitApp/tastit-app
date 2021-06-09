// React
import React, { memo } from 'react'

// Components
import { Host } from 'react-native-portalize'

// Navigation
import AppNavigator from '@navigation'

// Screens
// import Splash from '@screens/Splash'

// Utils
import Geolocation from '@react-native-community/geolocation'
import { LogBox, Platform, UIManager } from 'react-native'

// Helpers
// import useConfigureOneSignal from './useConfigureOneSignal'
// import useConfigurePassbase from './useConfigurePassbase'
// import useConfigureStripe from './useConfigureStripe'
import useConfigureAuth from './useConfigureAuth'


// Ignore specific warnings
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state.',
])

// Enable animations
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

// Geolocation.setRNConfiguration({
//     // authorizationLevel: ''
//     skipPermissionRequests: true,
//     authorizationLevel: 'auto',
// });

export default memo(() => {

    // const configureOneSignalResult = useConfigureOneSignal();
    // const configurePassbaseResult = useConfigurePassbase();
    // const configureStripeResult = useConfigureStripe();
    const configureAuthResult = useConfigureAuth();

    // const loaded = true;
    const loaded = configureAuthResult.complete;
        // && configureOneSignalResult.complete
        // && configurePassbaseResult.complete
        // && configureStripeResult.complete

    return (
        <>
            {loaded && (
                <Host>
                    <AppNavigator />
                </Host>
            )}
            {/* <Splash /> */}
        </>
    )
})