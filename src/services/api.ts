// Utils
import axios from 'axios'

// Env
import env from '@env'


// Constants
export const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'version': env.version,
}

export const client = axios.create({
    headers: { ...defaultHeaders },
    baseURL: env.APIUri,
})

console.log(`env.API_URI: ${env.APIUri}`)