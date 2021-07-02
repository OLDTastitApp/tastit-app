// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    id: string,
}

export default (args: Args) => {

    const { id } = args;

    const result = useQuery<
        graph.PlaceResult,
        graph.PlaceArgs
    >(
        graph.PLACE,
        {
            skip: id == null,
            variables: {
                id,
            },
        }
    );

    const place = result.data?.place;

    return [place, result] as [typeof place, typeof result];
}