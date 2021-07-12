// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.LikePostArgs['input']

export default () => {

    const [likePost, result] = useMutation<
        graph.LikePostResult,
        graph.LikePostArgs
    >(graph.LIKE_POST);

    const mutate = async (args: MutateArgs) => {

        const { postId } = args;

        return await likePost({
            variables: {
                input: {
                    postId,
                },
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}