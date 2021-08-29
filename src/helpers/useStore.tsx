// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


export default () => {

    const result = useQuery<
        graph.AuthenticatedResult
    >(graph.AUTHENTICATED);

    const store = result.data;

    return store;
}