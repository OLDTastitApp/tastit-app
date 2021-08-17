// Types
import { Connection } from './connection'
import { User } from './user'


export type District = {
    name: string,
    id?: string,
}

export type Dietetic = {
    name: string,
    id: string,
    Icon: any,
}

export type Pricing = {
    label: string,
    min?: number,
    max?: number,
    id: string,
}

export type Gastronomy = {
    name: string,
    id: string,
}

export type PageInfo = {
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}

export type Post = {
    createdAt: Date,
    updatedAt: Date,
    liked?: boolean,
    content: string,
    tags?: string[],
    users?: User[],
    picture: Image,
    creator: User,
    place?: Place,
    id: string,
}

export type Place = {
    timetable?: [number, number][],
    posts: Connection<Post>,
    attributes?: string[],
    phoneNumber?: string,
    category?: string,
    website?: string,
    // favorited?: boolean,
    longitude: number,
    latitude: number,
    pricing?: number,
    address: string,
    rating: number,
    liked: boolean,
    cover?: Image,
    name: string,
    id: string,
}

export type Image = {
    format: string,
    height: number,
    width: number,
    url: string,
    key: string,
    id: string,
}