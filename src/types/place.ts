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
    longitude: number,
    latitude: number,
    pricing?: number,
    address: string,
    rating: number,
    cover?: string,
    name: string,
    id: string,
}