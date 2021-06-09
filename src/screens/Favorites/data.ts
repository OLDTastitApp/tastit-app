// Types
import { Establishment, Favorite } from '@types'


export const favorites: Favorite[] = [
    { id: '0', name: `Yours` },
    { id: '1', name: `Ma liste végé` },
    { id: '2', name: `Bruxelles` },
    { id: '3', name: `Brasserie` },
    { id: '4', name: `Bar à république` },
]

export const establishments: Establishment[] = [
    {
        coverUri: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        address: '45 Avenue Bosquet, Paris',
        name: 'Kozy Bosquet',
        ratingCount: 101,
        pricing: 3,
        rating: 3,
        id: '0',
    },
    {
        coverUri: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        address: '45 Avenue Bosquet, Paris',
        name: 'Chez Paul',
        ratingCount: 101,
        pricing: 3,
        rating: 4.5,
        id: '1',
    },
    {
        coverUri: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        address: '45 Avenue Bosquet, Paris',
        name: 'Sushis bar',
        ratingCount: 101,
        pricing: 3,
        rating: 4.5,
        id: '2',
    },
    {
        coverUri: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        address: '45 Avenue Bosquet, Paris',
        name: 'American Burger',
        ratingCount: 101,
        pricing: 3,
        rating: 4.2,
        id: '3',
    },
    {
        coverUri: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80',
        address: '45 Avenue Bosquet, Paris',
        name: 'Taco’s ',
        ratingCount: 101,
        pricing: 3,
        rating: 3.5,
        id: '4',
    },
]