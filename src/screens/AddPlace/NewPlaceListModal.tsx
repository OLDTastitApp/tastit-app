// React
import React, { memo, useState, useRef, forwardRef, useImperativeHandle } from 'react'

// Components
import { View, Text, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableScale } from '@components'

// Utils
import { Keyboard } from 'react-native'

// Constants
import { color } from '@constants'

// Types
import { PlaceList } from '@types'


export default memo(forwardRef<Ref, Props>((props, ref) => {

    const modalRef = useRef<Modal>(null);
    const [value, setValue] = useState<string>();
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({ show }), []);

    const dismiss = () => setVisible(false);
    const show = () => setVisible(true);

    const onPress = () => {
        props.onSubmit(value);
        setValue(undefined);
        setVisible(false);
    };

    const disabled = !(value?.length > 0);

    return (
        <Modal
            animationType='slide'
            visible={visible}
            ref={modalRef}
            transparent
        >
            <LinearGradient
                colors={['#fff0', 'white']}
                style={styles.gradient}
                locations={[0, 0.4]}
            >
                <KeyboardAvoidingView
                    style={styles.wrapper}
                    behavior='padding'
                >
                    <TouchableOpacity
                        style={StyleSheet.absoluteFillObject}
                        activeOpacity={1}
                        onPress={dismiss}
                    />

                    <View style={styles.content}>

                        <Text style={styles.name}>
                            Nom de la liste
                        </Text>

                        <TextInput
                            placeholderTextColor={color.lightGray}
                            placeholder='Restaurants italiens'
                            onChangeText={setValue}
                            style={styles.input}
                            autoCorrect={false}
                            value={value}
                            autoFocus
                        />

                        <TouchableScale
                            style={[
                                styles.button,
                                disabled && styles.disabled,
                            ]}
                            disabled={disabled}
                            onPress={onPress}
                        >
                            <Text style={styles.submit}>
                                Créer
                            </Text>
                        </TouchableScale>
                    </View>

                </KeyboardAvoidingView>
            </LinearGradient>
        </Modal>
    )
}))

// Styles
const styles = StyleSheet.create({
    container: {
        
    },
    gradient: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    wrapper: {
        justifyContent: 'flex-end',
        width: '100%',
        flex: 1,
    },
    content: {
        marginHorizontal: 20,
    },
    name: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '600',
        fontSize: 22,
    },
    input: {
        fontFamily: 'Avenir Next',
        marginVertical: 10,
        color: color.dark,
        fontWeight: '500',
        marginBottom: 30,
        fontSize: 20,
    },
    button: {
        backgroundColor: color.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 100,
    },
    disabled: {
        backgroundColor: color.lightGray,
    },
    submit: {
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        color: 'white',
        fontSize: 18,
    },
})

// Types
export type Props = {
    onSubmit: (value: string) => void,
}

export type Ref = {
    show: () => void,
}