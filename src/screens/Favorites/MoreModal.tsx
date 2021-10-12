// React
import React, { memo, useState, useImperativeHandle, forwardRef } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import { View, Text, Alert, StyleSheet } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableScale, Modal } from '@components'

// Helpers
import { useSharePlaceList } from '@helpers'

// Constants
import { ui, font, color } from '@constants'

// Types
import { PlaceList, PlaceListRole } from '@types'


export default memo(forwardRef<Ref, Props>((props, ref) => {

    const [data, setData] = useState<{
        placeList: PlaceList,
    }>();
    // const [place, setPlace] = useState<Place>();
    // const [visible, setVisible] = useState(false);
    // const [image, setImage] = useState<Image>();

    const onDismiss = () => setData(undefined);
    // const onPress = () => setPlace(true);

    useImperativeHandle(ref, () => ({
        show: placeList => setData({ placeList }),
    }), []);

    const role = data?.placeList?.role;

    const onTrashPress = () => {
        Alert.alert(
            // `Supprimer ${data?.placeList?.name}`,
            data?.placeList?.name,
            role === 'PARTICIPANT'
            ? 'Êtes-vous sûr de vouloir quitter la liste ?'
            : `Êtes-vous sûr de vouloir supprimer la liste ?`,
            [
                {
                    text: 'Oui',
                    onPress: () => {
                        if (role === 'PARTICIPANT') {
                            props.onLeavePress(data?.placeList);
                        } else {
                            props.onDeletePress(data?.placeList);
                        }
                        onDismiss();
                    },
                },
                {
                    text: 'Non',
                    style: 'cancel',
                    onPress: onDismiss,
                },
            ]
        );
    };

    const onSharePress = () => {
        props.onSharePress(data?.placeList);
    };

    return (
        <Modal
            onClose={onDismiss}
            visible={!!data}
        >
            <View style={styles.handle} />

            <View style={styles.modal}>

                <Text style={styles.choose}>
                    {/* {data?.placeList?.name} */}
                    {/* Êtes-vous sûr de vouloir supprimer la liste
                    <Text style={{ fontWeight: 'bold' }}>{' '}{data?.placeList?.name}{' '}</Text>
                    ainsi que son contenu ? */}
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {data?.placeList?.name}
                    </Text>
                </Text>

                <TouchableScale
                    // onPress={onRemovePress}
                    onPress={onSharePress}
                    style={styles.item}
                    activeScale={0.99}
                >
                    <View style={styles.left}>
                        <Feather
                            color={color.dark}
                            // name='thumbs-up'
                            name='share'
                            size={20}
                        />
                    </View>

                    <Text style={styles.name}>
                        Partager la liste
                    </Text>
                </TouchableScale>

                <TouchableScale
                    // onPress={onDismiss}
                    onPress={onTrashPress}
                    style={styles.item}
                    activeScale={0.99}
                >
                    <View style={styles.left}>
                        <Feather
                            color={color.dark}
                            // name='thumbs-down'
                            name='trash-2'
                            size={20}
                        />
                    </View>

                    <Text style={styles.name}>
                        {role === 'PARTICIPANT'
                            ? 'Quitter la liste'
                            : 'Supprimer la liste'
                        }
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
        marginVertical: 10,
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
    onDeletePress: (placeList: PlaceList) => void,
    onLeavePress: (placeList: PlaceList) => void,
    onSharePress: (placeList: PlaceList) => void,
    // owner: boolean,
    // name: string,
}

export type Ref = {
    show: (item: PlaceList) => void,
}