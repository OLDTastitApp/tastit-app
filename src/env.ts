// Env
import Config from 'react-native-config'


export const APIVersion = Config.API_VERSION

export const version = Config.VERSION

// export const APIUri = Config.API_URI
export const APIUri = 'http://192.168.1.58:3000'
// export const APIUri = 'https://tastit-api-navy.vercel.app'

export const GraphQLUri = `${APIUri}/graphql`
// export const GraphQLUri = `${'http://localhost:3000'}/graphql`

export const GoogleWebClientId = Config.GOOGLE_WEB_CLIENT_ID