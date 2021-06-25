// React
import React, { memo, useState } from 'react'

// Components
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View, Text, Image, StyleSheet } from 'react-native'
import Library from '@assets/images/select_library.svg'
import Feather from 'react-native-vector-icons/Feather'
import Camera from '@assets/images/select_camera.svg'
import TouchableScale from './TouchableScale'
import Modal from './Modal'

// Utils
import ImagePicker from 'react-native-image-crop-picker'

// Constants
import { color, font, ui } from '@constants'

// Types
// import { ImagePickerOptions, ImagePickerResponse } from 'react-native-image-picker'


export default memo((props: Props) => {

    const { disabled, uri } = props;

    const [visible, setVisible] = useState(false);
    // const [image, setImage] = useState<Image>();

    const onDismiss = () => setVisible(false);
    const onPress = () => setVisible(true);

    // const pickerCallback = (response: ImagePickerResponse) => {
    //     const { didCancel, error, customButton } = response;
    //     const succeeded = [didCancel, error, customButton].every(v => !v);
        
    //     if (error) console.log(error);
        
    //     if (succeeded) {
    //         const image: PickedImage = {
    //             data: response.data,
    //             uri: response.uri,
    //         };
    //         props.onChanged?.(image);
    //         setVisible(false);
    //     }
    // };

    const onLibraryPress = async () => {
        const result = await ImagePicker.openPicker({
            includeBase64: true,
            cropping: true,
        });
        props?.onChanged({
            data: (result as any).data,
            uri: result.path,
        });
        setVisible(false);
    };

    const onCameraPress = async () => {
        // ImagePicker.launchCamera(options, pickerCallback);
        const result = await ImagePicker.openCamera({
            includeBase64: true,
            cropping: true,
        });
        props?.onChanged({
            data: (result as any).data,
            uri: result.path,
        });
        setVisible(false);
    };

    // const source = image?.uri || (image?.data && `data:image/jpeg;base64,${image.data}`);

    // console.log('image uri: ', image?.uri)

    return (
        <>
            <TouchableScale
                style={styles.container}
                disabled={disabled}
                activeScale={0.98}
                onPress={onPress}
            >
                {!!uri ? (
                    <Image
                    style={styles.placeholder}
                        source={{ uri }}
                    />
                ) : (
                    <View style={styles.placeholder}>
                        <FontAwesome5
                            name='user-circle'
                            color='white'
                            size={60}
                        />
                    </View>
                )}

                {!disabled && (
                    <View style={styles.edit}>
                        <Feather
                            name='edit-2'
                            color='white'
                            size={16}
                        />
                    </View>
                )}

            </TouchableScale>

            <Modal
                onClose={onDismiss}
                visible={visible}
            >
                <View style={styles.handle} />

                <View style={styles.modal}>

                    <Text style={styles.choose}>
                        Choisir depuis
                    </Text>

                    <View style={styles.content}>

                        <TouchableScale
                            onPress={onLibraryPress}
                            style={styles.item}
                        >
                            <Library
                                // fill={color.primary}
                                // fill={color.mediumGray}
                                fill={color.dark}
                                height={60}
                                width={60}
                            />
                            <Text style={styles.name}>
                                Bibliothèque
                            </Text>
                        </TouchableScale>
                        
                        <TouchableScale
                            onPress={onCameraPress}
                            style={styles.item}
                        >
                            <Camera
                                // fill={color.primary}
                                // fill={color.light}
                                fill={color.dark}
                                height={60}
                                width={60}
                            />
                            <Text style={styles.name}>
                                Caméra
                            </Text>
                        </TouchableScale>

                    </View>
                </View>
            </Modal>
        </>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 20,
        // backgroundColor: 'red',
        alignSelf: 'center',
    },
    placeholder: {
        backgroundColor: color.lightGray,
        // backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 130,
        // marginBottom: 10,
        height: 130,
        width: 130,
    },
    edit: {
        // backgroundColor: color.primary,
        backgroundColor: color.dark,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 40,
        height: 40,
        width: 40,
        bottom: 0,
        right: 0,
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
        fontFamily: font.semiBold,
        marginHorizontal: 20,
        textAlign: 'center',
        color: color.dark,
        marginBottom: 30,
        fontSize: 24,
    },
    content: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    item: {
        alignItems: 'center',
    },
    name: {
        fontFamily: font.regular,
        color: color.darkGray,
        marginTop: 10,
    },
})

// Types
export type Props = {
    onChanged?: (image: PickedImage) => void,
    disabled?: boolean,
    uri?: string,
}

export type PickedImage = {
    data?: string,
    uri?: string,
}