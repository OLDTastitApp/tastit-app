// Env
import app from '../app.json'


const envChannel = process.env.REACT_NATIVE_CHANNEL;
const channel = envChannel || 'local';

const shared = {
    name: app.displayName,
    OneSignalAppId: '',
    version: '1.0.0',
    SentryDSN: '',
}

const host = '192.168.0.46:3000';
// const host = 'staging.api.tastit.refael.me';
// const host = '192.168.0.39:3000';
// const host = '192.168.0.46:3000';
// const host = '192.168.1.78:3000';
const protocol = 'http';
// const protocol = 'https';

const environments: {
    [channel: string]: Partial<Environment>,
} = {
    local: {
        GraphQLUri: `${protocol}://${host}/graphql`,
        APIUri: `${protocol}://${host}`,
    },
    prod: {
        GraphQLUri: `${protocol}://${host}/graphql`,
        APIUri: `${protocol}://${host}`,
    },
    example: {
        GraphQLUri: `https://example.com/graphql`,
        APIUri: `http://example.com`,
    },
}

export default <Environment>{
    ...environments[channel],
    ...shared,
}

// Types
type Environment = {
    OneSignalAppId: string,
    GraphQLWSUri: string,
    GraphQLUri?: string,
    version: string,
    APIUri: string,
    name: string,
}