// Types
import { Image } from './image'
import { Place } from './place'
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

    createdAt: Date,
    updatedAt: Date,
    liked?: boolean,
    content: string,
    users?: User[],
    picture: Image,
    creator: User,
    place?: Place,
    author: User,
    id: string,
}
