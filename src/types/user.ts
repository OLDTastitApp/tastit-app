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
    biography?: string,
    username?: string,
    firstName: string,
    lastName: string,
    roles?: Role[],
    // cover: Image,
    cover: string,
    id: string,
}