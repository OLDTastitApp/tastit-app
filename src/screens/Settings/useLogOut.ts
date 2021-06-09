// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


export default () => {

    const [logOut, result] = useMutation<
        graph.LogOutResult
    >(graph.LOG_OUT);

    const callback = logOut;

    return [callback, result] as [typeof callback, typeof result]
}
