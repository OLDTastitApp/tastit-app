// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


export default () => {

    const result = useQuery<graph.PlaceTagsResult>(graph.PLACE_TAGS);

    const tags = result.data?.placeTags;

    return [tags, result] as [typeof tags, typeof result];
}