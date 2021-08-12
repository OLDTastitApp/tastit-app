// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'

// Types
import { User } from '@types'

type Args = {
    biography?: string,
    firstName?: string,
    lastName?: string,
    cover?: string,
    user: User,
}

const stringChanged = (l: string, r: string) => (
    (l ?? '') !== (r ?? '') && r?.length > 0
)

const selectUpdate = (l: string, r: string) => (
    stringChanged(l, r) ? r : undefined
)

export default (args: Args) => {

    const { user, ...fields } = args;

    const [updateProfile, updateProfileResult] = useMutation<
        graph.UpdateProfileResult,
        graph.UpdateProfileArgs
    >(graph.UPDATE_PROFILE);

    const patch = {
        biography: selectUpdate(user.biography, fields.biography),
        firstName: selectUpdate(user.firstName, fields.firstName),
        lastName: selectUpdate(user.lastName, fields.lastName),
        cover: fields.cover,
    };

    const canSubmit = () => (
        Object.values(patch).some(value => value !== undefined)
    );

    const mutate = () => {
        return updateProfile({
            variables: {
                input: {
                    id: user.id,
                    patch,
                },
            },
        });
    };

    const result = {
        ...updateProfileResult,
        canSubmit,
    };

    return [mutate, result] as [typeof mutate, typeof result];
}