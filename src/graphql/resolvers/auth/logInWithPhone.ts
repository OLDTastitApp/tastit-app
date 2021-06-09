// Services
import { API, OAuth } from '@services'

// Env
import env from '@env'


type Input = {
    scope: 'individual' | 'professional',
    phone: string,
    pin: string,
}

type ClaimCodeResult = {
    code: string,
}

export default async (input: Input) => {

    const oauth = OAuth.getClient('app');

    const result = await API.client.post<ClaimCodeResult>(
        '/oauth/phone/claim', { ...input }
    );

    // Exchange Phone authorization code
    var authorizeResult = await oauth.authorize({
        grantType: 'authorization_code',
        issuer: env.OAuthPhoneIssuer,
        code: result.data.code,
        responseType: 'code',
        scope: input.scope,
    });

    return await oauth.token({
        redirectUri: env.OAuthRedirectUri,
        grantType: 'authorization_code',
        code: authorizeResult.code,
    });
}