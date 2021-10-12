// React
import React, { memo, useState } from 'react'

// Components
import { View, ScrollView, StatusBar, Linking } from 'react-native'
import SwitchRow from './SwitchRow'
import LinkRow from './LinkRow'
import Section from './Section'
import NavBar from './NavBar'
import Footer from './Footer'

// Helpers
import { useNavigation } from '@navigation/utils'
// import useLogOut from './useLogOut'
import { useLogOut } from '@helpers'


export default memo(() => {

    const navigation = useNavigation();

    const [logOut, logOutResult] = useLogOut();

    const [mobileNotificationEnabled, setMobileNotificationEnabled] = useState(false);
    const [emailNotificationEnabled, setEmailNotificationEnabled] = useState(false);

    return (
        <ScrollView contentContainerStyle={{
            flexGrow: 1, backgroundColor: '#ffffff',
        }}>

            <StatusBar barStyle='dark-content' />

            <NavBar
                onBackPress={navigation.goBack}
                title='Préférences'
            />

            {/* <SwitchRow
                onChanged={setMobileNotificationEnabled}
                value={mobileNotificationEnabled}
                label='Notifications mobiles'
            />

            <SwitchRow
                onChanged={setEmailNotificationEnabled}
                value={emailNotificationEnabled}
                label='Notifications par email'
            /> */}

            <Section title='General settings' />

            <LinkRow
                onPress={() => Linking.openURL('mailto:support@tastit.app')}
                label='Un problème avec votre compte ?'
                uri=''
            />

            {/* <LinkRow
                label={`Noter l'application`}
                onPress={() => {}}
                uri=''
            /> */}

            <LinkRow
                onPress={() => Linking.openURL('https://www.tastit.app')}
                label='À propos'
                uri=''
            />

            <LinkRow
                onPress={() => Linking.openURL('mailto:hello@tastit.app')}
                label='Nous contacter'
                uri=''
            />

            <Section title='App settings' />

            {/* <LinkRow
                onPress={() => {}}
                label='Notifications'
                uri=''
            /> */}

            <LinkRow
                onPress={() => Linking.openURL('https://www.tastit.app/dataprivacy')}
                label='Données personnelles'
                uri=''
            />

            <LinkRow
                onPress={() => Linking.openURL('https://www.tastit.app/terms')}
                label={`Conditions d'utilisation`}
                uri=''
            />

            <LinkRow
                onPress={() => Linking.openURL('https://www.tastit.app/privacy')}
                label={`Cookies`}
                uri=''
            />

            <Section title='General settings' />

            <LinkRow
                onPress={() => 'mailto:support@tastit.app?subject=Suppression de compte&body=Je souhaite supprimer mon compte'}
                label='Supprimer mon compte'
                uri=''
            />

            <LinkRow
                label='Se déconnecter'
                onPress={logOut}
                uri=''
            />

            {/* <Footer
                onLogOutPress={logOut}
                // onLogOutPress={() => {
                //     alert('LOG OUT')
                // }}
            /> */}
        </ScrollView>
    )
})