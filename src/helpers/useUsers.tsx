// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    searchText?: string,
    skip?: boolean,
    after?: string,
    first: number,
}

export default (args: Args) => {

    const { searchText, first, after, skip } = args;

    const result = useQuery<
        graph.UsersResult,
        graph.UsersArgs
    >(
        graph.USERS,
        {
            fetchPolicy: 'cache-and-network',
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