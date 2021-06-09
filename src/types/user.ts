// Types
import { Image } from './image'


export type User = {
    biography?: string,
    username?: string,
    firstName: string,
    lastName: string,
    cover: Image,
    id: string,
}