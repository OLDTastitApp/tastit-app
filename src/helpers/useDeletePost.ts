// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.DeletePostArgs['input']

export default () => {

    const [deletePost, result] = useMutation<
        graph.DeletePostResult,
        graph.DeletePostArgs
    >(graph.DELETE_POST);

    const mutate = async (args: MutateArgs) => {

        const { id } = args;

        const result = await deletePost({
            refetchQueries: [
                'Posts',
            ],
            variables: {
                input: {
                    id,
                },
            },
        });

        return result;
    };

    return [mutate, result] as [typeof mutate, typeof result];
}