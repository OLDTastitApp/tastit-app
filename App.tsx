// React
import React, { memo, useRef, useCallback, useEffect } from 'react'

// Components
import { BottomSheetModalProvider, BottomSheetModal, useBottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { View, StatusBar, Button, YellowBox, LogBox, Platform } from 'react-native'
import App from '@screens/App'

// Apollo
import { ApolloProvider } from '@apollo/client'
import client from '@graphql/client'

// Utils
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency'

// Helpers
import useAppTracking, { AppTrackingContext } from '@helpers/useAppTracking'

// YellowBox.ignoreWarnings([
//     'Require cycle',
// ])

// LogBox.ignoreLogs([
//     'Warning: Require cycle',
// ])
// LogBox.ignoreAllLogs(true)

const snapPoints = ['25%', '50%']

const Main = memo(() => {

    // hooks
    const { dismiss, dismissAll } = useBottomSheetModal();

    // refs
    const bottomSheetModalARef = useRef<BottomSheetModal>(null);
    const bottomSheetModalBRef = useRef<BottomSheetModal>(null);
    const bottomSheetModalCRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentAPress = useCallback(() => {
        bottomSheetModalARef.current?.present();
    }, []);

    const handleDismissAPress = useCallback(() => {
        bottomSheetModalARef.current?.dismiss();
    }, []);

    const handlePresentBPress = useCallback(() => {
        bottomSheetModalBRef.current?.present();
    }, []);

    const handleDismissBPress = useCallback(() => {
        bottomSheetModalBRef.current?.dismiss();
    }, []);

    const handlePresentCPress = useCallback(() => {
        bottomSheetModalCRef.current?.present();
    }, []);

    const handleDismissCPress = useCallback(() => {
        bottomSheetModalCRef.current?.dismiss();
    }, []);

    const handleDismissAllPress = useCallback(() => {
        dismissAll();
    }, [dismissAll]);

    const handleDismissByHookPress = useCallback(() => {
        dismiss('A');
    }, [dismiss]);

    return (
        <>
            <View style={{ flex: 1, paddingTop: 100 }}>
                <Button title="Present Modal A" onPress={handlePresentAPress} />
                <Button title="Dismiss Modal A" onPress={handleDismissAPress} />
                <Button title="Present Modal B" onPress={handlePresentBPress} />
                <Button title="Dismiss Modal B" onPress={handleDismissBPress} />
                <Button title="Present Modal C" onPress={handlePresentCPress} />
                <Button title="Dismiss Modal C" onPress={handleDismissCPress} />
                <Button title="Dismiss All Modal" onPress={handleDismissAllPress} />
                <Button title="Dismiss A By Hook" onPress={handleDismissByHookPress} />
            </View>

            <BottomSheetModal
                ref={bottomSheetModalARef}
                snapPoints={snapPoints}
                name='A'
            >
                <View style={{
                    backgroundColor: 'red',
                    height: 500,
                    width: '100%',
                }}>
                </View>
            </BottomSheetModal>

            <BottomSheetModal
                ref={bottomSheetModalBRef}
                snapPoints={snapPoints}
                name='B'
            >
                <View style={{
                    backgroundColor: 'green',
                    height: 500,
                }}>
                </View>
            </BottomSheetModal>
            
            <BottomSheetModal
                ref={bottomSheetModalCRef}
                snapPoints={snapPoints}
                name='C'
            >
                <View style={{
                    backgroundColor: 'blue',
                    height: 500,
                }}>
                </View>
            </BottomSheetModal>
        </>
    )
})

export default () => {

    const { allowed: appTrackingAllowed } = useAppTracking();
    
    return (
        <>
            <StatusBar
                backgroundColor='transparent'
                // barStyle='dark-content'
                barStyle='light-content'
                translucent
            />

            {/* <BottomSheetModalProvider>
                <Main />
            </BottomSheetModalProvider> */}

            <AppTrackingContext.Provider value={{ allowed: appTrackingAllowed }}>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </AppTrackingContext.Provider>
            {/* <Splash /> */}
            {/* {(global as any).HermesInternal == null ? null : (
                <Text>
                    Engine: Hermes
                </Text>
            )} */}
        </>
    )
}