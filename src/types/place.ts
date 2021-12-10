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
    index: number,
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
    pictureSource?: any,
    createdAt: Date,
    updatedAt: Date,
    liked?: boolean,
    content: string,
    tags?: string[],
    picture?: Image,
    users?: User[],
    creator: User,
    place?: Place,
    id: string,
}

export type Tag = {
    name: string,
    id: string,
}

export type Place = {
    timetable?: [number, number][],
    recommendationCount?: number,
    posts: Connection<Post>,
    phoneNumber?: string,
    userRating?: number,
    categories?: Tag[],
    longitude: number,
    website?: string,
    latitude: number,
    pricing?: number,
    address: string,
    rating: number,
    liked: boolean,
    cover?: Image,
    name: string,
    tags: Tag[],
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