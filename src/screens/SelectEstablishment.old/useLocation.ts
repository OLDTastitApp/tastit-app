// React
import { useState, useEffect, useCallback } from 'react'

// Helpers
import Geolocation from '@react-native-community/geolocation'
import { useApolloClient } from '@apollo/client'
import * as graph from '@graphql/graph'

// Types
import { Establishment } from '@types'


// type FetchArgs = graph.PlacesArgs

type State = {
    loading: boolean,
    data?: number[],
    error?: any,
}

export default () => {
    const [state, setState] = useState<State>({ loading: true });

    const refetch = useCallback(
        () => {
            Geolocation.getCurrentPosition(
                position => {
                    const { longitude, latitude } = position.coords;
                    setState({
                        data: [longitude, latitude],
                        error: undefined,
                        loading: false,
                    });
                },
                error => {
                    setState({
                        data: undefined,
                        loading: false,
                        error,
                    });
                },
                { enableHighAccuracy: true }
            );
        },
        []
    );

    useEffect(() => refetch(), []);
    
    return { ...state, refetch };
}