// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    skip?: boolean,
    after?: string,
    first: number,
}

export default (args: Args) => {

    const { first, after, skip } = args;

    const result = useQuery<
        graph.FriendsResult,
        graph.FriendsArgs
    >(
        graph.FRIENDS,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                after,
                first,
            },
            skip,
        }
    );

    const friends = result.data?.friends;

    return [friends, result] as [typeof friends, typeof result];
}