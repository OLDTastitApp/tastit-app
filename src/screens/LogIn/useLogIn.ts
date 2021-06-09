// Apollo
import { useMutation } from '@apollo/client'

// Types
import { MutationResult } from '@apollo/client'
import * as graph from '@graphql/graph'


type Result = MutationResult<graph.LogInResult>

type MutateArgs = {
    password: string,
    email: string,
}

export default () => {

    const [logIn, result] = useMutation<
        graph.LogInResult,
        graph.LogInArgs
    >(graph.LOG_IN);

    const mutate = (args: MutateArgs) => {
        return logIn({
            variables: {
                input: {
                    method: 'credentials',
                    scope: 'individual',
                    ...args,
                },
            },
        });
    };

    return [mutate, result] as [typeof mutate, Result]
}