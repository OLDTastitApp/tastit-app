// React
import { useState, useMemo } from 'react'

// Helpers
import { useApolloClient } from '@apollo/client'
import * as graph from '@graphql/graph'
import { deepDiffer } from '@utils'

// Types
import { Props as DistrictFilterProps } from '../SearchModal/DistrictFilter'
import { Filters } from '../SearchModal'
import { District } from '@types'

// Data
import * as data from './data'


type DistrictSelection = DistrictFilterProps['selection']

const defaultFilters: Filters = {
    district: [],
    pricing: [],
    // rating: [],
}

export default () => {

    const [districtSelection, setDistrictSelection] = useState<DistrictSelection>([]);
    // const [district, setDistrict] = useState(data.districts);
    const [district, setDistrict] = useState<string[]>([]);
    const [pricing, setPricing] = useState<number[]>([]);

    // const filters = useMemo<Filters>(
    //     () => ({
    //         district,
    //         pricing,
    //     }),
    //     []
    // );
    const filters = {
        district,
        pricing,
    };

    const canApply = deepDiffer(filters, defaultFilters);
    const canClear = canApply
    console.log(`deepDiffer: ${canApply}`)

    return {
        setDistrict,
        setPricing,
        ...filters,
        canApply,
    };
}