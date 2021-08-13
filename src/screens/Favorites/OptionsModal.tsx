// React
import React, { memo, useState, useImperativeHandle, forwardRef } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import { View, Text, StyleSheet } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableScale, Modal } from '@components'

// Constants
import { ui, font, color } from '@constants'

// Types
import { Place } from '@types'


export default memo(forwardRef<Ref, Props>((props, ref) => {

    const [data, setData] = useState<{
        placeListId: string,
        place: Place,
    }>();
    // const [place, setPlace] = useState<Place>();
    // const [visible, setVisible] = useState(false);
    // const [image, setImage] = useState<Image>();

    const onDismiss = () => setData(undefined);
    // const onPress = () => setPlace(true);

    useImperativeHandle(ref, () => ({
        show: (place, placeListId) => {
            setData({ placeListId, place });
        },
    }), []);

    const onRemovePress = () => {
        props.onRemovePress(data?.place, data?.placeListId);
    };

    return (
        <Modal
            onClose={onDismiss}
            visible={!!data}
        >
            <View style={styles.handle} />

            <View style={styles.modal}>

                <Text style={styles.choose}>
                    {data?.place?.name}
                </Text>

                <TouchableScale
                    onPress={onRemovePress}
                    style={styles.item}
                >
                    <View style={styles.left}>
                        <Feather
                            color={color.dark}
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
    )
}))

// Styles
const styles = StyleSheet.create({
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
    left: {
        backgroundColor: `${color.dark}11`,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        height: 50,
        width: 50,
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
export type Props = {
    onRemovePress: (item: Place, placeListId: string) => void,
    // name: string,
}

export type Ref = {
    show: (item: Place, placeListId: string) => void,
}