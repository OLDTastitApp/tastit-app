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

export type Place = {
    favorited?: boolean,
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