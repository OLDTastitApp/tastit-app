// Utils
import decode from 'jwt-decode'


export const isExpired = (token: string) => {
    const { exp } = decode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
}