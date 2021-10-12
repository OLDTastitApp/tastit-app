// Types
import { Connection } from './connection'
import { Image } from './image'
import { Place } from './place'


export type PlaceListRole = 'ADMINISTRATOR' | 'PARTICIPANT' | 'OWNER'

export type PlaceList = {
    places: Connection<Place>,
    role: PlaceListRole,
    createdAt?: string,
    cover?: Image,
    count: number,
    name: string,
    id: string,
}