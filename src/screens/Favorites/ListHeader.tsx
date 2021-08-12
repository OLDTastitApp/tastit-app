// React
import React, { memo, useState } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
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
                style={[styles.container, styles.shadow]}
                onPress={onPress}
            >

                <Text style={styles.title}>
                    {props.count} {props.count > 1 ? 'éléments' : 'élément'}
                </Text>

                {/* <TouchableScale
                    onPress={props.onCountPress}
                > */}
                    <Entypo
                        name='dots-three-horizontal'
                        // color={color.mediumGray}
                        // color={color.lightGray}
                        color={color.dark}
                        // color={'white'}
                        size={12}
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
                        <View style={{
                            width: 50,
                            height: 50,
                            backgroundColor: `${color.dark}11`,
                            // backgroundColor: `${color.primary}`,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 40,
                        }}>
                            <Feather
                                color={color.dark}
                                // color={color.light}
                                name='trash'
                                size={20}
                            />
                        </View>

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
        // backgroundColor: color.mediumGray,
        backgroundColor: 'white',
        alignSelf: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 3,
        borderRadius: 50,
        marginTop: 10,
    },
    shadow: {
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowColor: '#000',
        // shadowOpacity: 0.25,
        shadowOpacity: 0.15,
        shadowRadius: 5.84,
        elevation: 5,
    },
    title: {
        // fontFamily: font.bold,
        fontFamily: 'Avenir Next',
        // color: color.mediumGray,
        // color: color.gray,
        // color: 'white',
        color: color.dark,
        fontWeight: '600',
        fontSize: 12,
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
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    name: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 10,
        fontSize: 22,
        marginLeft: 20,
    },
})

// Types
type Props = {
    onRemovePress: () => void,
    onCountPress: () => void,
    count: number,
    name: string,
}