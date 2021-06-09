// React
import React from 'react'

// Components
import { StatusBar, YellowBox, LogBox } from 'react-native'
import App from '@screens/App'

// Apollo
import { ApolloProvider } from '@apollo/client'
import client from '@graphql/client'

// YellowBox.ignoreWarnings([
//     'Require cycle',
// ])

// LogBox.ignoreLogs([
//     'Warning: Require cycle',
// ])
// LogBox.ignoreAllLogs(true)


export default () => (
    <>
        <StatusBar
            backgroundColor='transparent'
            // barStyle='dark-content'
            barStyle='light-content'
            translucent
        />
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
        {/* <Splash /> */}
        {/* {(global as any).HermesInternal == null ? null : (
            <Text>
                Engine: Hermes
            </Text>
        )} */}
    </>
)