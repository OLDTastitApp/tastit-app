// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


export default () => {

    const result = useQuery<graph.PlaceCategoriesResult>(graph.PLACE_CATEGORIES);

    const categories = result.data?.placeCategories;

    return [categories, result] as [typeof categories, typeof result];
}