// Resolvers
import * as AuthResolvers from './auth'


export default {
    Query: {},
    Mutation: {
        ...AuthResolvers.Mutation,
    },
}