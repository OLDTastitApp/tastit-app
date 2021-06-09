// React
import React, { memo } from 'react'

// Components
import { useNavigation } from '@navigation/utils'
import Background from './Background'
import { pictureUris } from './data'
import { View } from 'react-native'
import Footer from './Footer'


export default memo(() => {

    const navigation = useNavigation();

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    const onLogInPress = () => {
        navigation.navigate('LogIn');
    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Background
                pictureUris={pictureUris}
                numberOfItems={3}
            />

            <Footer
                onSignUpPress={onSignUpPress}
                onLogInPress={onLogInPress}
            />
        </View>
    )
})