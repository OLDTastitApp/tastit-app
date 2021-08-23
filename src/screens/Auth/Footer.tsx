// React
import React, { memo } from 'react'

// Components
import LinearGradient from 'react-native-linear-gradient'
import { View, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MainIcon from '@assets/images/main.svg'
import { TouchableScale } from '@components'

// Utils
import { ui, font, color } from '@constants'


export default memo((props: Props) => {

    return (
        <View style={StyleSheet.absoluteFillObject}>

            <LinearGradient
                colors={['#ffffff00', '#ffffff']}
                start={{ x: 0, y: 0.6 }}
                style={styles.gradient}
                end={{ x: 0, y: 1 }}
            />

            <View style={styles.content}>
                <MainIcon
                    fill={color.primary}
                    style={styles.icon}
                    height={130}
                    width={130}
                />

                <Text
                    adjustsFontSizeToFit
                    style={styles.title}
                    numberOfLines={1}
                >
                    Bienvenue sur Tastit !
                </Text>

                <TouchableScale
                    onPress={props.onSignUpPress}
                    style={styles.button}
                    activeScale={0.98}
                >
                    <Text style={styles.signUp}>
                        S'inscrire
                    </Text>
                </TouchableScale>

                <TouchableScale
                    style={[
                        styles.button,
                        styles.transparent,
                        {
                            borderWidth: 1,
                            marginBottom: 20,
                            borderColor: color.primary,
                        }
                    ]}
                    onPress={props.onLogInPress}
                    activeScale={0.98}
                >
                    <Text style={styles.logIn}>
                        Se connecter
                    </Text>
                </TouchableScale>

                <View style={{
                    // font
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    // marginTop: 20,
                    marginBottom: 10,
                }}>
                    <Text
                        style={{
                            fontWeight: '600',
                            color: color.dark,
                            fontFamily: 'Avenir Next',
                            fontSize: 14,
                        }}
                        onPress={props.onLogInPress}
                    >
                        Continuer avec les réseaux sociaux
                    </Text>
                    {/* <FontAwesome
                        style={{ marginHorizontal: 5 }}
                        color={color.mediumGray}
                        name='apple'
                        size={20}
                    />
                    <FontAwesome
                        style={{ marginHorizontal: 5 }}
                        color={color.mediumGray}
                        name='google'
                        size={18}
                    />
                    <FontAwesome
                        style={{ marginHorizontal: 5 }}
                        color={color.mediumGray}
                        name='facebook'
                        size={18}
                    /> */}
                </View>
            </View>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    content: {
        paddingBottom: ui.safePaddingBottom,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    icon: {
        alignSelf: 'center',
        top: 15,
    },
    title: {
        // fontFamily: font.semiBold,
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        textAlign: 'center',
        color: color.dark,
        marginBottom: 20,
        fontSize: 26,
    },
    button: {
        backgroundColor: color.primary,
        marginHorizontal: 15,
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    transparent: {
        backgroundColor: 'transparent',
    },
    signUp: {
        // fontFamily: font.semiBold,
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        marginHorizontal: 20,
        textAlign: 'center',
        color: color.light,
        fontSize: 18,
    },
    logIn: {
        // fontFamily: font.semiBold,
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        marginHorizontal: 20,
        textAlign: 'center',
        // color: color.dark,
        color: color.primary,
        fontSize: 16,
    },
})

// Types
type Props = {
    onSignUpPress: () => void,
    onLogInPress: () => void,
}