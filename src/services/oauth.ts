// Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Utils
import moment from 'moment'
import qs from 'qs'


export const instances: Instances = {}

export const getClient = (id: string) => {
    return instances[id];
}

const extractToken = (obj: object) => {

    const fields: (keyof Token)[] = [
        'accessTokenExpiresAt',
        'refreshToken',
        'accessToken',
        'scope',
    ];

    return fields.reduce(
        (map, field) => {
            map[field] = obj[field];
            return map;
        },
        {}
    ) as Token;
}

export const createClient = (config: Config) => {
    const client = new Client(config);
    if (config.id) {
        instances[config.id] = client;
    }
    return client;
}

export const removeClient = (id: string) => {
    delete instances[id];
}

export class Client {
    
    protected authorizeEndpoint = 'oauth/authorize'
    protected tokenEndpoint = 'oauth/token'
    protected storageKey = '@OAuth.default'
    protected clientId?: string
    protected baseUri?: string
    protected id?: string

    constructor(config: Config) {
        Object.assign(this, config);
    }

    private request: OAuthClientRequest = async (endpoint, fields) => {

        const snakeBody = Object
            .entries({
                clientId: this.clientId,
                ...fields,
            })
            .reduce<object>(
                (map, [key, value]) => {
                    map[camelToSnake(key)] = value;
                    return map;
                }, {}
            );

        const rawResponse = await fetch(
            `${this.baseUri}/${endpoint}`,
            {
                body: qs.stringify(snakeBody),
                headers: HEADERS,
                method: 'POST',
            }
        );

        if (!rawResponse.ok) {
            throw Error('Unauthorized');
        }

        return rawResponse;
    }

    removeToken: RemoveToken = async () => {
        await AsyncStorage.removeItem(
            `${this.storageKey}:state`
        );
    }

    getToken: GetToken = async () => {
        const item = await AsyncStorage.getItem(
            `${this.storageKey}:state`
        );

        if (!item) return null;
        
        const token = <Token>JSON.parse(item);

        const expiration = new Date(token.accessTokenExpiresAt);
        const expired = Date.now() >= expiration.getTime();
        
        if (expired) {
            return await this.token({
                refreshToken: token.refreshToken,
                grantType: 'refresh_token',
            });
        }
        
        return token;
    }

    token: OAuthClientToken = async args => {

        const now = moment();

        const response = await this.request(
            this.tokenEndpoint, args
        );

        const rawResult: {
            refresh_token: string,
            access_token: string,
            expires_in: number,
            token_type: string,
            scope: string,
        } = await response.json();

        const accessTokenExpiresAt = now.add(rawResult.expires_in, 'seconds').toDate();

        const result = Object
            .entries(rawResult)
            .reduce<object>(
                (map, [key, value]) => {
                    map[snakeToCamel(key)] = value;
                    return map;
                },
                {
                    accessTokenExpiresAt,
                }
            );
    
        await AsyncStorage.setItem(
            `${this.storageKey}:state`,
            JSON.stringify(result)
        );
    
        return extractToken(result);
    }

    authorize: OAuthClientAuthorize = async args => {
        
        const response = await this.request(
            this.authorizeEndpoint, args
        );

        const matches = response.url.match(/.*\?(.*)/);
        const params = qs.parse(matches[1]);
        
        const code = params['code'] as string;

        if (code == null) {
            throw Error('Bad authorization code returned');
        }

        return { code };
    }
}

// Constants
const HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
}

// Helpers
const camelToSnake = (value: string) => {
    return value
        .replace(/[\w]([A-Z])/g, ([l, r]) => `${l}_${r}`)
        .toLowerCase();
}

const snakeToCamel = (value: string) => {
    return value.replace(
        /(_\w)/g,
        ([_, v]) => v.toUpperCase()
    );
}

type Instances = { [id: string]: Client }

type Config = {
    authorizeEndpoint?: string,
    tokenEndpoint?: string,
    storageKey?: string,
    clientId: string,
    baseUri: string,
    id?: string,
}

// Methods
type RemoveToken = () => Promise<void>

type GetToken = () => Promise<Token>

type OAuthClientRequest = (
    endpoint: string,
    fields: object,
) => Promise<Response>

type OAuthClientAuthorize = <TArgs = {}>(
    args: AuthorizeArgs<TArgs>
) => Promise<AuthorizeResponse>

type OAuthClientToken = (
    args: TokenArgs
) => Promise<TokenResponse>

export type Token = {
    accessTokenExpiresAt: Date,
    refreshToken: string,
    accessToken: string,
    expiresIn: number,
    tokenType: string,
    scope: string,
}

// Args & Reponses
type TokenArgs = {
    grantType: 'password',
    username: string,
    password: string,
    scope: string,
} | {
    grantType: 'authorization_code',
    redirectUri: string,
    code: string,
} | {
    grantType: 'refresh_token',
    refreshToken: string,
}

type TokenResponse = Token

type AuthorizeArgs<TArgs> = {
    [T in keyof TArgs]: TArgs[T]
} & {
    grantType: 'authorization_code',
    responseType: 'code',
    issuer?: string,
    scope: string,
    code: string,
}

type AuthorizeResponse = {
    code: string,
}