// React
import React, { useRef, useEffect, useState, createContext } from 'react'

// Utils
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency'
import { Platform } from 'react-native'


const defaultValue = {
    allowed: Platform.OS === 'ios' ? false : true,
}

export const AppTrackingContext = createContext(defaultValue)


export default () => {

    const [allowed, setAllowed] = useState(defaultValue.allowed);

    useEffect(
        () => {
            (async () => {
                if (Platform.OS === 'ios') {
                    let trackingStatus = await getTrackingStatus();
        
                    if (trackingStatus === 'not-determined') {
                        trackingStatus = await requestTrackingPermission();
                    }

                    if (trackingStatus === 'authorized') {
                        setAllowed(true);
                    }
                }
            })();
        },
        []
    );

    return { allowed };
}