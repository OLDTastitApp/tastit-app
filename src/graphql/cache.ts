// Apollo
import { FieldMergeFunction, InMemoryCache, TypePolicies, Reference } from '@apollo/client'

// Utils
import { uniqBy } from 'ramda';


// Helpers
const concatPagination: FieldMergeFunction<Reference[], Reference[]> = (
    existing = [], incoming, { args }
) => {
    type Args = {
        // cursor?: { id: string };
        // skip?: number;
        // take?: number;
        after?: string,
    };

    // const { skip } = args as Args;
  
    // Reset the list if data starts from beginning
    // if (skip == null) {
    if ((args as Args)?.after == null) {
        return incoming;
    }

    return uniqBy(
        ({ __ref }) => __ref,
        [...existing, ...incoming]
    );
}

const Me: TypePolicies[any] = {
    fields: {
        posts: {
            keyArgs: false,
            merge: concatPagination,
        },
    },
}

export default new InMemoryCache({
    typePolicies: {
        Me,
    },
})