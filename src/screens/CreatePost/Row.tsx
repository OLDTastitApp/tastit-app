// React
import React, { memo } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import { Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { font, color } from '@constants'


export default memo((props: Props) => {
    
    const { onPress, title, value } = props;
    
    return (
        <TouchableScale
            style={styles.container}
            activeScale={0.98}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.title,
                    value && styles.active,
                ]}
                numberOfLines={1}
            >
                {value || title}
            </Text>

            <Feather
                color={value ? color.dark : `${color.darkGray}99`}
                name='chevron-right'
                size={20}
            />
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    title: {
        color: `${color.darkGray}99`,
        fontSize: 20,
    },
    active: {
        color: color.dark,
    },
})

// Types
type Props = {
    onPress: () => void,
    value?: string,
    title: string,
}