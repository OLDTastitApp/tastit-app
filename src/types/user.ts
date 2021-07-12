// Types
import { Image } from './image'


export type RoleName =
    | 'ADMINISTRATOR'
    | 'USER'

export type Role = {
    name: RoleName,
    id: string,
}

export type User = {
    // biography?: string,
    // username?: string,
    // firstName: string,
    // lastName: string,
    // // cover: Image,
    // cover: string,
    // id: string,
    
    followingCount: number,
    followerCount: number,
    following?: boolean,
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