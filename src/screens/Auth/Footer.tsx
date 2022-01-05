// React
import React, { memo } from 'react'

// Components
import { FacebookSignIn, GoogleSignIn, AppleSignIn, TouchableScale } from '@components'
import { View, Text, StyleSheet, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MainIcon from '@assets/images/main.svg'

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
                    flexDirection: 'row',
                    // backgroundColor: 'red',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}>
                    <View style={styles.line} />
                    <Text style={styles.or}>
                        ou
                    </Text>
                    <View style={styles.line} />
                </View>

                <View style={{ alignItems: 'center' }}>
                    {Platform.OS === 'ios' && (
                        <AppleSignIn
                            title='Continuer avec Apple'
                            onPress={props.onAppleLogInPress}
                        />
                    )}
                    <FacebookSignIn
                        title='Continuer avec Facebook'
                        onPress={props.onFacebookLogInPress}
                    />
                    <GoogleSignIn
                        title='Continuer avec Google'
                        onPress={props.onGoogleLogInPress}
                    />
                </View>

                {/* <View style={{
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
                </View> */}
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
    line: {
        backgroundColor: color.lightGray,
        height: 1,
        flex: 1,
    },
    or: {
        fontFamily: 'Avenir Next',
        color: color.lightGray,
        marginHorizontal: 20,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18,
    },
})

// Types
type Props = {
    onFacebookLogInPress: () => void,
    onGoogleLogInPress: () => void,
    onAppleLogInPress: () => void,
    onSignUpPress: () => void,
    onLogInPress: () => void,
}