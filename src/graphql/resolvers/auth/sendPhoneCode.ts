// Apollo
import * as graph from '@graphql/graph'

// Services
import { API } from '@services'

// Types
import { AsyncLocalResolver } from '../../types/resolver'


export const sendPhoneCode: AsyncLocalResolver<
    graph.SendPhoneCodePayload, never, graph.SendPhoneCodeArgs
> = async (_root, { input }) => {

    const { phone } = input;

    // Send phone code
    await API.client.post('/oauth/phone/send', { phone });

    return {
        __typename: 'SendPhoneCodePayload',
        phone,
    };
}