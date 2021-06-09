// Utils
import { image, name, date, random, datatype, address, lorem } from 'faker'

// Types
import { User } from '@types'


export const getUsers = (limit: number) => {
    return <User[]>[...Array(limit)].map(
        () => ({
            firstName: name.firstName(),
            pictureUri: image.avatar(),
            lastName: name.lastName(),
            id: datatype.uuid(),
        })
    )
}

export const users = getUsers(100)