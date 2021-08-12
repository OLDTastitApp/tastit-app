// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    skip?: boolean,
    id: string,
}

export default (args: Args) => {

    const { id, skip } = args;

    const result = useQuery<
        graph.UserResult,
        graph.UserArgs
    >(
        graph.USER,
        {
            skip: id == null || skip,
            variables: {
                id,
            },
        }
    );

    const user = result.data?.user;

    return [user, result] as [typeof user, typeof result];
}