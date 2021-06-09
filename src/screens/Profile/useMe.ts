// Apollo
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


export default () => {

    const result = useQuery<
        graph.MeResult
    >(graph.ME);

    const me = result.data?.me;

    return [me, result] as [typeof me, typeof result]
}
