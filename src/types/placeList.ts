// Types
import { Connection } from './connection'
import { Image } from './image'
import { Place } from './place'


export type PlaceList = {
    places: Connection<Place>,
    createdAt?: string,
    cover?: Image,
    count: number,
    name: string,
    id: string,
}