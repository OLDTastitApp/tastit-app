// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


export default () => {

    const result = useQuery<
        graph.UserIdResult
    >(
        graph.USER_ID
    );

    const { authenticated, userId } = result.data;

    return authenticated ? userId : null;
}