// Apollo
import { useMutation, useApolloClient } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.VerifyEmailArgs['input']

export default () => {

    const [verifyEmail, result] = useMutation<
        graph.VerifyEmailResult,
        graph.VerifyEmailArgs
    >(graph.VERIFY_EMAIL);

    const mutate = async (args: MutateArgs) => {
        return await verifyEmail({
            variables: {
                input: args,
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result]
}