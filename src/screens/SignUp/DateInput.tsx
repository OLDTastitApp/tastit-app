// React
import React, { memo, useState, useEffect } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableScale, Modal } from '@components'
import DatePicker from 'react-native-date-picker'

// Utils
import moment from 'moment'

// Constants
import { color, font, ui } from '@constants'


export default memo((props: Props) => {

    const minimumDate = moment().subtract(90, 'years').toDate();
    const maximumDate = moment().subtract(13, 'years').toDate();
    const defaultDate = moment(maximumDate).subtract(1, 'year').startOf('year').toDate();

    const [date, setDate] = useState(props.value || defaultDate);
    const [visible, setVisible] = useState(false);

    const empty = props.value == null;
    const value = !empty
        ? moment(props.value).format('DD/MM/YYYY')
        : props.placeholder;

    const resetDate = () => {
        setDate(props.value || defaultDate);
    };

    const onPress = () => setVisible(true);

    const onDismiss = () => {
        setVisible(false);
        resetDate();
    };

    const submit = () => {
        props.onChange?.(date);
        setVisible(false);
    };

    useEffect(
        () => resetDate(),
        [props.value]
    );

    const canSubmit = date.valueOf() !== props.value?.valueOf();

    return (
        <>
            <TouchableScale
                disabled={props.disabled}
                style={styles.container}
                onPress={onPress}
                activeScale={1}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                </View>

                <Text
                    style={[
                        styles.value,
                        empty && styles.placeholder,
                    ]}
                >
                    {value}
                </Text>
            </TouchableScale>

            <Modal
                onClose={onDismiss}
                visible={visible}
            >
                <View style={styles.handle} />

                <View style={styles.modal}>
                    <DatePicker
                        maximumDate={maximumDate}
                        minimumDate={minimumDate}
                        textColor={color.dark}
                        onDateChange={setDate}
                        fadeToColor={'white'}
                        date={date}
                        locale='fr'
                        mode='date'
                    />

                    <TouchableScale
                        style={[
                            styles.submit,
                            !canSubmit && styles.disabled,
                        ]}
                        disabled={!canSubmit}
                        onPress={submit}
                    >
                        <Feather
                            style={styles.icon}
                            color='white'
                            name='check'
                            size={30}
                        />
                    </TouchableScale>
                </View>
            </Modal>
        </>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginBottom: 10,
    },
    header: {
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        color: color.dark,
        fontSize: 22,
    },
    value: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '500',
        fontSize: 18,
    },
    placeholder: {
        color: '#ccc',
    },
    handle: {
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 4,
        width: 30,
        height: 4,
    },
    modal: {
        paddingBottom: ui.safePaddingBottom + 10,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        alignItems: 'center',
        paddingTop: 20,
    },
    submit: {
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 10,
        height: 50,
        width: 50,
    },
    disabled: {
        backgroundColor: '#eee',
    },
    icon: {
        left: 1,
    },
})

// Types
export type Props = {
    onChange?: (value: Date) => void,
    placeholder?: string,
    disabled?: boolean,
    title: string,
    value: Date,
}