// React
import React, { memo, useState } from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableScale, Modal } from '@components'

// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => {

    const [visible, setVisible] = useState(false);
    // const [image, setImage] = useState<Image>();

    const onDismiss = () => setVisible(false);
    const onPress = () => setVisible(true);

    return (
        <>
            <TouchableScale
                // onPress={props.onCountPress}
                style={styles.container}
                onPress={onPress}
            >

                <Text style={styles.title}>
                    {props.count} éléments
                </Text>

                {/* <TouchableScale
                    onPress={props.onCountPress}
                > */}
                    <Entypo
                        name='dots-three-horizontal'
                        color={color.mediumGray}
                        size={14}
                    />
                {/* </TouchableScale> */}

            </TouchableScale>

            <Modal
                onClose={onDismiss}
                visible={visible}
            >
                <View style={styles.handle} />

                <View style={styles.modal}>

                    <Text style={styles.choose}>
                        {props.name}
                    </Text>

                    <TouchableScale
                        onPress={props.onRemovePress}
                        style={styles.item}
                    >
                        <Text style={styles.name}>
                            Supprimer
                        </Text>
                    </TouchableScale>

                </View>
            </Modal>
        </>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
    },
    title: {
        // fontFamily: font.bold,
        fontFamily: 'Avenir Next',
        color: color.mediumGray,
        fontWeight: '600',
        fontSize: 14,
        // flex: 1,
        marginRight: 10,
    },
    handle: {
        backgroundColor: color.light,
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 4,
        width: 30,
        height: 4,
    },
    modal: {
        paddingBottom: ui.safePaddingBottom + 10,
        backgroundColor: color.light,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingTop: 20,
    },
    choose: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
        // textAlign: 'center',
        fontWeight: '500',
        color: color.gray,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 18,
    },
    content: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    item: {
        // alignItems: 'center',
        marginLeft: 20,
    },
    name: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 10,
        fontSize: 22,
    },
})

// Types
type Props = {
    onRemovePress: () => void,
    onCountPress: () => void,
    count: number,
    name: string,
}