// React
import { useState } from 'react'

// Helpers
import { useApolloClient } from '@apollo/client'
import * as graph from '@graphql/graph'

// Types
import { Place } from '@types'


type FetchArgs = graph.PlacesArgs

export default () => {

    // const [data, setData] = useState<graph.PlacesResult['places']['edges'][0]['node'][]>([]);
    const [data, setData] = useState<Place[]>([]);

    const client = useApolloClient();

    const clear = () => setData([]);

    const fetch = async (args: FetchArgs) => {

        const results = await client.query<
            graph.PlacesResult,
            graph.PlacesArgs
        >({
            query: graph.PLACES,
            variables: args,
        });

        const existingPlaces = data.reduce(
            (map, node) => {
                map[node.id] = node;
                return map;
            },
            {}
        );

        const newPlaces = results?.data.places.edges
            .filter(({ node }) => !existingPlaces[node.id])
            .map(({ node }) => node);

        // setData(places => [...places, ...newPlaces]);
        setData(newPlaces);
    };

    return { data, fetch, clear };
}