// React
import React, { memo, useState, useEffect } from 'react'

// Components
import { Host } from 'react-native-portalize'

// Navigation
import AppNavigator from '@navigation'

// Screens
// import Splash from '@screens/Splash'

// Utils
import Geolocation from '@react-native-community/geolocation'
import { LogBox, Platform, UIManager } from 'react-native'
import axios from 'axios'

// Services
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Settings as FacebookSettings } from 'react-native-fbsdk-next'

// Helpers
// import useConfigureOneSignal from './useConfigureOneSignal'
// import useConfigurePassbase from './useConfigurePassbase'
// import useConfigureStripe from './useConfigureStripe'
import useRestoreAuth from '@helpers/useRestoreAuth'

// Env
import * as env from '@env'

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

    const [initialized, setInitialized] = useState(false);

    useEffect(
        () => {
            try {
                // Call backend to prevent lambda cold starts
                axios.get(env.APIUri).then(response => {
                    console.log(`Calling backend: ${env.APIUri}: ${JSON.stringify(response.data)}`);
                });
    
                // Facebook
                // FacebookSettings.setAdvertiserTrackingEnabled(true);
                FacebookSettings.initializeSDK();
    
                // Google
                GoogleSignin.configure({
                    webClientId: env.GoogleWebClientId,
                });
            } finally {
                setInitialized(true);
            }
        },
        []
    );

    // const configureOneSignalResult = useConfigureOneSignal();
    // const configurePassbaseResult = useConfigurePassbase();
    // const configureStripeResult = useConfigureStripe();
    const restoreAuthResult = useRestoreAuth();

    // const loaded = true;
    const loaded = initialized && restoreAuthResult.complete;
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