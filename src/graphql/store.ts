// Apollo
import { gql, InMemoryCache } from '@apollo/client'

// App
import app from '../../app.json'

// Types
import { Store } from './types'


const store: Store = {
    authenticated: false,
    appName: app.name,
    complete: false,
    userId: '',
    role: '',
}

export const initializeStore = async (
    cache: InMemoryCache
) => {
    cache.writeQuery({
        data: store,
        query: gql`
            query {
                authenticated
                complete
                appName
                userId
                role
            }
        `,
  });
}