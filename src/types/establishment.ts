// Types
import { Image } from './image'


export type Establishment = {
    ratingCount?: number,
    location: number[],
    pricing?: number,
    types?: string[],
    address: string,
    rating: number,
    cover?: Image,
    name: string,
    id: string,
}