// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.RatePlaceArgs['input']

export default () => {

    const [ratePlace, result] = useMutation<
        graph.RatePlaceResult,
        graph.RatePlaceArgs
    >(graph.RATE_PLACE);

    const mutate = async (args: MutateArgs) => {

        const { placeId, rating } = args;

        return await ratePlace({
            variables: {
                input: {
                    placeId,
                    rating,
                },
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}