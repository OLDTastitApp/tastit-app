// Utils
import { image, name, random, datatype, lorem } from 'faker'

// Types
import { User } from '@types'


export const user: User = {
    // description: lorem.sentence(20),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    firstName: name.firstName(),
    pictureUri: image.avatar(),
    lastName: name.lastName(),
    id: datatype.uuid(),
}

const pictureUris = [
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80',
]

const randomPicture = () => {
    const min = 0, max = pictureUris.length - 1;
    const index = Math.floor(Math.random() * (max - min + 1) + min);
    return pictureUris[index];
}

export const pictures = [...Array(20)].map(randomPicture)