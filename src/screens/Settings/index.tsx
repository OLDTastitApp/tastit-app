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
import useLogOut from './useLogOut'


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
                title='Settings'
            />

            <Section title='App settings' />

            <LinkRow
                onPress={() => {}}
                label='Data'
                uri=''
            />

            <SwitchRow
                onChanged={setMobileNotificationEnabled}
                value={mobileNotificationEnabled}
                label='Mobile notification'
            />

            <SwitchRow
                onChanged={setEmailNotificationEnabled}
                value={emailNotificationEnabled}
                label='Email notification'
            />
            
            <LinkRow
                onPress={() => {}}
                label='Language'
                uri=''
            />

            <Section title='General settings' />

            <LinkRow
                label='Having issues with your account ?'
                onPress={() => {}}
                uri=''
            />

            <LinkRow
                onPress={() => {}}
                label='About Tastit'
                uri=''
            />

            <LinkRow
                label='About Account'
                onPress={() => {}}
                uri=''
            />

            <Footer
                onLogOutPress={logOut}
            />
        </ScrollView>
    )
})