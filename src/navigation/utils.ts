// Helpers
import * as RNN from '@react-navigation/native'

// Types
import { Establishment, User, Me } from '@types'


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
    goBack?: () => void,
    navigate: <TRouteName extends RouteName>(
        routeName: TRouteName,
        params?: Params<TRouteName>,
    ) => void,
}

// Params
export type Params<TRouteName> =
    TRouteName extends 'SelectEstablishment'
    ? SelectEstablishmentParams
    : TRouteName extends 'SelectFriends'
    ? SelectFriendsParams
    : TRouteName extends 'EditProfile'
    ? EditProfileParams
    : TRouteName extends 'CreatePost'
    ? CreatePostParams
    : TRouteName extends 'AddPlace'
    ? AddPlaceParams
    : never

export type RouteName =
    | 'SelectEstablishment'
    | 'SelectFriends'
    | 'EditProfile'
    | 'Screenshot'
    | 'CreatePost'
    | 'Favorites'
    | 'BottomTab'
    | 'Settings'
    | 'AddPlace'
    | 'Profile'
    | 'Search'
    | 'SignUp'
    | 'LogIn'
    | 'Home'

type SelectEstablishmentParams = {
    setEstablishment: (value: Establishment) => void,
}

type SelectFriendsParams = {
    setFriends: (value: User[]) => void,
}

type EditProfileParams = {
    me: Me,
}

type CreatePostParams = {
    pictureBase64?: string,
    pictureUri: string,
    filter: string,
}

type AddPlaceParams = {
    placeId: string,
}