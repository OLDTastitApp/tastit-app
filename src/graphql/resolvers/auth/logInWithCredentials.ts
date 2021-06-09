// Services
import { OAuth } from '@services'


type Input = {
    scope: 'individual' | 'professional',
    password: string,
    email: string,
}

export default async (input: Input) => {

    const oauth = OAuth.getClient('app');

    return await oauth.token({
        password: input.password,
        username: input.email,
        grantType: 'password',
        scope: input.scope,
    });
}