// Types
import { Establishment } from './establishment'
import { Image } from './image'
import { User } from './user'


export type Post = {
    // pictureUris: string[],
    // description?: string,
    // createdAt: Date,
    // position: {
    //     longitude: number,
    //     latitude: number,
    //     name: string,
    // },
    // user: User,
    content?: string,
    picture: Image,
    place?: Establishment,
    author: User,
    id: string,
}