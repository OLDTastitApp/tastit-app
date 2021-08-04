// React
import React from 'react'

// Components
import { Text, StyleSheet, Linking } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

// Constants
import { font, color } from '@constants'


export default (props: Props) => {

    const { uri } = props;

    const onPress = () => {
        if (props.onPress) {
            props?.onPress(uri);
        } else {
            Linking.openURL(uri);
        }
    };
    
    return (
        <TouchableScale
            style={styles.container}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.label,
                    props.color && { color: props.color },
                ]}
            >
                {props.label}
            </Text>

            <Feather
                name='chevron-right'
                size={18}
            />

        </TouchableScale>
    )
}

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    label: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '500',
        marginRight: 20,
        fontSize: 16,
        flex: 1,
    },
})

// Types
type Props = {
    onPress?: (uri: string) => void,
    color?: string,
    label: string,
    uri: string,
}