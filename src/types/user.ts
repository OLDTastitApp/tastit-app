// Types
import { Image } from './image'


export type RoleName =
    | 'ADMINISTRATOR'
    | 'USER'

export type Role = {
    complete: boolean,
    name: RoleName,
    id: string,
}

export type User = {
    // username?: string,
    // firstName: string,
    // lastName: string,
    // // cover: Image,
    // cover: string,
    // id: string,
    placeListCount: number,
    followingCount: number,
    followerCount: number,
    following?: boolean,
    biography?: string,
    postCount: number,
    nickname?: string,
    firstName: string,
    lastName: string,
    picture?: Image,
    phone?: string,
    email?: string,
    roles?: Role[],
    id: string,
}