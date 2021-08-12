// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    skip?: boolean,
}

export default (args: Args = {}) => {

    const { skip } = args;

    const result = useQuery<
        graph.MeResult
    >(
        graph.ME,
        { skip }
    );

    const me = result.data?.me;

    return [me, result] as [typeof me, typeof result];
}