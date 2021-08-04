// React
import React, { memo, useState } from 'react'

// Components
import { View, ScrollView, StatusBar } from 'react-native'
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
                label='Un problème avec votre compte ?'
                onPress={() => {}}
                uri=''
            />

            <LinkRow
                label={`Noter l'application`}
                onPress={() => {}}
                uri=''
            />

            <LinkRow
                onPress={() => {}}
                label='À propos'
                uri=''
            />

            <LinkRow
                label='Nous contacter'
                onPress={() => {}}
                uri=''
            />

            <Section title='App settings' />

            <LinkRow
                onPress={() => {}}
                label='Notifications'
                uri=''
            />

            <LinkRow
                onPress={() => {}}
                label='Données personnelles'
                uri=''
            />

            <LinkRow
                onPress={() => {}}
                label={`Conditions d'utilisation`}
                uri=''
            />

            <LinkRow
                onPress={() => {}}
                label={`Cookies`}
                uri=''
            />

            <Section title='General settings' />

            <LinkRow
                label='Supprimer mon compte'
                onPress={logOut}
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