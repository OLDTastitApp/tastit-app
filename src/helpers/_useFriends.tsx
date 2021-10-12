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

    // const { current: allUsers } = useRef<User[]>(getUsers(100));
    // const [data, setData] = useState<User[]>([]);

    // const friends = useMemo(
    //     () => {
    //         return allUsers.filter(({ firstName, lastName }) => (
    //             `${firstName ?? ''}${lastName ?? ''}`.includes(searchText)
    //         ));
    //     },
    //     [searchText]
    // );

    // return [friends];

    // const []

    const result = useQuery<
        graph.UsersResult,
        graph.UsersArgs
    >(
        graph.USERS,
        {
            variables: {
                searchText,
                after,
                first,
            },
            skip,
        }
    );

    const users = result.data?.users;

    return [users, result] as [typeof users, typeof result];
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