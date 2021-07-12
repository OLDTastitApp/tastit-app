// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    id: string,
}

export default (args: Args) => {

    const { id } = args;

    const result = useQuery<
        graph.UserResult,
        graph.UserArgs
    >(
        graph.USER,
        {
            skip: id == null,
            variables: {
                id,
            },
        }
    );

    const user = result.data?.user;

    return [user, result] as [typeof user, typeof result];
}