// Helpers
import * as RNN from '@react-navigation/native'

// Types
import { Place, User, Me } from '@types'


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
    pop: (depth: number) => void,
    setParams: (params: any) => void,
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
    : TRouteName extends 'VerifyEmail'
    ? VerifyEmailParams
    : TRouteName extends 'CreatePost'
    ? CreatePostParams
    : TRouteName extends 'AddPlace'
    ? AddPlaceParams
    : TRouteName extends 'Profile'
    ? ProfileParams
    : never

export type RouteName =
    | 'SelectEstablishment'
    | 'SelectFriends'
    | 'EditProfile'
    | 'VerifyEmail'
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
    setPlace: (value: Place) => void,
    place?: Place,
}

type SelectFriendsParams = {
    setUsers: (users: User[]) => void,
    users?: User[],
}

type EditProfileParams = {
    me: Me,
}

type VerifyEmailParams = {
    username?: string,
    password?: string,
    token?: string,
}

type CreatePostParams = {
    pictureBase64?: string,
    pictureUri: string,
    filter: string,
}

type AddPlaceParams = {
    placeId: string,
}

type ProfileParams = {
    userId?: string,
}