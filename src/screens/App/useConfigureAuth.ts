// React
import { useState, useEffect } from 'react'

// Apollo
import { useMutation } from '@apollo/client'

// Services
import { OAuth } from '@services'

// Types
import * as graph from '@graphql/graph'

// Env
import env from '@env'


export default () => {

    const [complete, setComplete] = useState(false);

    const [restoreAuth, result] = useMutation<
        graph.RestoreAuthResult
    >(graph.RESTORE_AUTH);

    useEffect(
        () => {
            (async () => {
                OAuth.createClient({
                    baseUri: env.OAuthUri,
                    clientId: env.OAuthId,
                    id: 'app',
                });

                try {
                    await restoreAuth();
                } finally {
                    setComplete(true);
                }
            })();

            return () => {
                OAuth.removeClient('app');
            };
        },
        []
    );

    return { ...result, complete };
}
