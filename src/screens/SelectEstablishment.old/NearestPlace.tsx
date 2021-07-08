// React
import React, { memo } from 'react'

// Components
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { color, font } from '@constants'

// Types
import { Establishment } from '@types'


export default memo((props: Props) => {

    const { item, onDismissPress } = props;

    const onSelectPress = () => {
        props.onSelectPress(item);
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Vous trouvez-vous ici ?
            </Text>

            <View style={styles.content}>
                <Image
                    source={{ uri: item.cover.value }}
                    style={styles.left}
                />

                <View style={styles.cell}>
                    <Text
                        style={styles.name}
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>
                    <Text style={styles.address}>
                        {item.address}
                    </Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableScale
                    onPress={onDismissPress}
                    style={[
                        styles.button,
                        { backgroundColor: undefined }
                    ]}
                >
                    <Text
                        style={[
                            styles.action,
                            { color: color.primary }
                        ]}
                    >
                        Non
                    </Text>
                </TouchableScale>

                <TouchableScale
                    onPress={onSelectPress}
                    style={styles.button}
                >
                    <Text style={styles.action}>
                        Oui
                    </Text>
                </TouchableScale>
            </View>

            <View style={styles.separator} />
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f8f8f8',
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 10,
        padding: 10,
    },
    title: {
        fontFamily: font.semiBold,
        color: color.dark,
        marginBottom: 10,
        fontSize: 18,
    },
    left: {
        backgroundColor: '#f8f8f8',
        borderRadius: 80,
        height: 60,
        width: 60,
    },
    content: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    cell: {
        justifyContent: 'center',
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontFamily: font.regular,
        color: color.dark,
        fontSize: 16,
    },
    address: {
        fontFamily: font.regular,
        color: color.darkGray,
        fontSize: 14,
    },
    footer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        // marginTop: 10,
    },
    button: {
        backgroundColor: color.primary,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 50,
    },
    action: {
        fontFamily: font.semiBold,
        color: color.light,
        fontSize: 16,
    },
    separator: {
        backgroundColor: '#f8f8f8',
        // marginVertical: 10,
        marginTop: 20,
        // marginBottom: 20,
        height: 1,
    },
})

// Types
export type Props = {
    onSelectPress: (item: Establishment) => void,
    onDismissPress: () => void,
    item: Establishment,
}