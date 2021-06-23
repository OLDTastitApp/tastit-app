// Env
import app from '../app.json'


const envChannel = process.env.REACT_NATIVE_CHANNEL;
const channel = envChannel || 'local';

const shared = {
    OAuthPhoneIssuer: '',
    OAuthId: 'com.tastit.app',
    name: app.displayName,
    // version: app.version,
    OneSignalAppId: '',
    SentryDSN: '',
}

// const host = 'localhost:3000';
// const host = 'staging.api.tastit.refael.me';
// const host = '192.168.0.39:3000';
const host = '192.168.0.46:3000';
// const host = '192.168.1.78:3000';
const protocol = 'http';
// const protocol = 'https';

const environments: {
    [channel: string]: Partial<Environment>,
} = {
    local: {
        OAuthRedirectUri: `${protocol}://${host}/oauth/authorize/redirect`,
        GraphQLUri: `${protocol}://${host}/graphql`,
        OAuthUri: `${protocol}://${host}`,
        APIUri: `${protocol}://${host}`,
    },
    prod: {
        OAuthRedirectUri: `${protocol}://${host}/oauth/authorize/redirect`,
        GraphQLUri: `${protocol}://${host}/graphql`,
        OAuthUri: `${protocol}://${host}`,
        APIUri: `${protocol}://${host}`,
    },
    example: {
        OAuthRedirectUri: `https://example.com/oauth/authorize/redirect`,
        GraphQLUri: `https://example.com/graphql`,
        OAuthUri: `https://example.com`,
        APIUri: `http://example.com`,
    },
}

export default <Environment>{
    ...environments[channel],
    ...shared,
}

// Types
type Environment = {
    OAuthPhoneIssuer?: string,
    OAuthRedirectUri: string,
    OneSignalAppId: string,
    GraphQLWSUri: string,
    GraphQLUri?: string,
    SentryDSN: string,
    OAuthUri: string,
    OAuthId: string,
    version: string,
    APIUri: string,
    name: string,
}