// Env
import Config from 'react-native-config'


export const APIVersion = Config.API_VERSION

export const version = Config.VERSION

export const APIUri = Config.API_URI

// export const GraphQLUri = `${APIUri}/graphql`
// export const GraphQLUri = `${'http://localhost:3000'}/graphql`
export const GraphQLUri = `${'http://192.168.0.46:3000'}/graphql`

export const GoogleWebClientId = Config.GOOGLE_WEB_CLIENT_ID