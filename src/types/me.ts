// Types
import { User } from './user'


export type Me = {
    favoriteCount?: number,
    followerCount?: number,
    listCount?: number,
    user: User,
    id: string,
}