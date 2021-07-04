// React
import React, { memo, useRef, useEffect } from 'react'

// Components
import { MessagePopup, TouchableScale } from '@components'
import { View, Text, StyleSheet, Alert } from 'react-native'

// Helpers
import { useNavigation, useRoute } from '@navigation/utils'
import { useLogIn, useVerifyEmail } from '@helpers'
import { openInbox } from 'react-native-email-link'

// Constants
import { ui, color } from '@constants'

// Types
import { MessagePopupRef } from '@components'


export default memo(function VerifyEmail() {

    const successRef = useRef<MessagePopupRef>(null);

    const navigation = useNavigation();
    const { params } = useRoute<'VerifyEmail'>();
    const { current: { username, password } } = useRef(params);

    const [verifyEmail, verifyEmailResult] = useVerifyEmail();
    const [logIn, logInResult] = useLogIn();

    useEffect(
        () => {
            console.log(`VERIFY EMAIL MOUNTED !!!`)
            if (params.token) {
                (async () => {
                    try {
                        await verifyEmail({
                            token: params.token,
                        });

                        try {
                            await successRef.current.show();
                            await logIn.logInWithCredentials({
                                username,
                                password,
                            });
                            // navigation.setParams({});
                            // navigation.goBack();
                        } catch (e) {
                            console.log(JSON.stringify(e, null, 4));
                            // navigation.setParams({});
                            navigation.pop(2);
                        }
                    } catch (e) {
                        Alert.alert(`Impossible de vérifier l'email.`);
                    }
                })();
            }
        },
        [params]
    );

    const onOpenInboxPress = () => {
        openInbox();
    };

    return (
        <View style={{
            // justifyContent: 'center',
            backgroundColor: 'white',
            // alignItems: 'center',
            flex: 1,
        }}>
            <View style={{
                justifyContent: 'center',
                flex: 1,
            }}>
                <Text style={{
                    marginHorizontal: 20,
                    // jus
                }}>
                    🎉👏 Bienvenu sur Tastit,
                    Nous avons besoin de vérifier ton email avant de poursuivre
                    {/* {JSON.stringify({
                        ...params,
                        OLD: {
                            username,
                            password,
                        },
                    }, null, 4)} */}
                </Text>
            </View>

            <TouchableScale
                onPress={onOpenInboxPress}
                style={styles.button}
                activeScale={0.99}
            >
                <Text style={styles.submit}>
                    Ouvrir les emails
                </Text>
            </TouchableScale>

            <MessagePopup
                message={'Email verifié'}
                ref={successRef}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    button: {
        marginBottom: ui.safePaddingBottom,
        backgroundColor: color.primary,
        marginHorizontal: 15,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    submit: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
        textAlign: 'center',
        fontWeight: '600',
        color: 'white',
        fontSize: 22,
    },
})