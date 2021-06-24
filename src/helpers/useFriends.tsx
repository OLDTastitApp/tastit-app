// React
import { useState, useMemo, useRef } from 'react'

// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'

// Utils
import { image, name, date, random, datatype, address, lorem } from 'faker'

// Types
import { User } from '@types'


type Args = {
    searchText?: string,
    skip?: boolean,
    after?: string,
    first: number,
}

export default (args: Args) => {

    const { searchText, first, after, skip } = args;

    const { current: allUsers } = useRef<User[]>(getUsers(100));
    const [data, setData] = useState<User[]>([]);

    const friends = useMemo(
        () => {
            return allUsers.filter(({ firstName, lastName, username }) => (
                `${firstName ?? ''}${lastName ?? ''}${username ?? ''}`.includes(searchText)
            ));
        },
        [searchText]
    );

    return [friends];

    // const []

    // const result = useQuery<
    //     graph.PlacesResult,
    //     graph.PlacesArgs
    // >(
    //     graph.PLACES,
    //     {
    //         variables: {
    //             searchText,
    //             after,
    //             first,
    //         },
    //         skip,
    //     }
    // );

    // const places = result.data?.places;

    // return [places, result] as [typeof places, typeof result];
}


export const getUsers = (limit: number) => {
    return [...Array(limit)].map<User>(
        () => ({
            firstName: name.firstName(),
            lastName: name.lastName(),
            id: datatype.uuid(),
            cover: null,
        })
    )
}