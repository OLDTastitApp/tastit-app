// React
import { useState } from 'react'

// Utils
import { Region } from 'react-native-maps'


type Args = {
    defaultLongitude: number,
    defaultLatitude: number,
}

export default (args: Args) => {

    // Ask for permissions ...

    // ...
    const state = useState<Region>({
        longitude: args.defaultLongitude,
        latitude: args.defaultLatitude,
        longitudeDelta: 0.02,
        latitudeDelta: 0.02,
    });

    return state;
}