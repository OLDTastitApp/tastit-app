// Types
import { District } from '@types'


export const districts: District[] = [
    '1er', ...[...Array(19)].map((_, i) => `${i + 2}ème`)
].map((name, i) => ({
    id: `750${''.padEnd(+(i > 10), '0')}${i}`,
    name,
}));

