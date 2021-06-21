// React
import React, { memo, useState } from 'react'

// Components
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { color } from '@constants'


export default memo((props: Props) => {

    const [index, setIndex] = useState<number>();
    
    const services = ['Facebook', 'Instagram', 'WhatsApp'];
    // const colors = ['#2d88ff', '#E1306C', '#65cf72'];
    const colors = [color.primary, color.primary, color.primary];

    const buttonBackgroundColor = (i: number) => ({
        backgroundColor: i === index ? colors[i] : 'transparent'
    });

    const iconColor = (i: number) => (
        i === index ? 'white' : color.mediumGray
    );

    const onPress = (i: number) => {
        setIndex(i === index ? undefined : i);
        props.onShareChanged(
            i === index ? undefined : services[i]
        );
    };

    return (
        <View style={styles.container}>

            <TouchableScale
                onPress={() => onPress(0)}
                style={[
                    styles.button,
                    buttonBackgroundColor(0),
                ]}
            >
                <FontAwesome5
                    color={iconColor(0)}
                    name='facebook-f'
                    size={22}
                />
            </TouchableScale>

            <TouchableScale
                onPress={() => onPress(1)}
                style={[
                    styles.button,
                    buttonBackgroundColor(1),
                ]}
            >
                <FontAwesome5
                    color={iconColor(1)}
                    name='instagram'
                    size={30}
                />
            </TouchableScale>

            <TouchableScale
                onPress={() => onPress(2)}
                style={[
                    styles.button,
                    buttonBackgroundColor(2),
                ]}
            >
                <FontAwesome5
                    color={iconColor(2)}
                    name='whatsapp'
                    size={30}
                />
            </TouchableScale>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        height: 50,
        width: 50,
    },
})

// Types
type Props = {
    onShareChanged: (service: string) => void,
    // onPress: () => void,
    // value?: string,
    // title: string,
}