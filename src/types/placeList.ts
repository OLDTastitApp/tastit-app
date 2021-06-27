// Types
import { Connection } from './connection'
import { Place } from './place'


export type PlaceList = {
    places: Connection<Place>,
    createdAt?: string,
    name: string,
    id: string,
}