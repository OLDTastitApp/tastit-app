// Helpers
import * as RNN from '@react-navigation/native'

// Types
import { Establishment, Me } from '@types'


type Route<TRouteName> = {
    params: Params<TRouteName>,
    name?: string,
    key?: string,
}

export const useRoute = <TRouteName extends RouteName>(): Route<TRouteName> => (
    RNN.useRoute() as any
)

export const useNavigation = (): Navigation => (
    RNN.useNavigation()
)

type Navigation = Omit<
    ReturnType<typeof RNN.useNavigation>,
    'navigate'
> & {
    navigate: <TRouteName extends RouteName>(
        routeName: TRouteName,
        params?: Params<TRouteName>,
    ) => void,
}

// Params
export type Params<TRouteName> =
    TRouteName extends 'SelectEstablishment'
    ? SelectEstablishmentParams
    : TRouteName extends 'EditProfile'
    ? EditProfileParams
    : TRouteName extends 'CreatePost'
    ? CreatePostParams
    : never

export type RouteName =
    | 'SelectEstablishment'
    | 'EditProfile'
    | 'Screenshot'
    | 'CreatePost'
    | 'Favorites'
    | 'BottomTab'
    | 'Settings'
    | 'Profile'
    | 'Search'
    | 'SignUp'
    | 'LogIn'
    | 'Home'

type SelectEstablishmentParams = {
    setEstablishment: (value: Establishment) => void,
}

type EditProfileParams = {
    me: Me,
}

type CreatePostParams = {
    pictureBase64?: string,
    pictureUri: string,
    filter: string,
}