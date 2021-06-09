// React
import React, { memo, useRef, useState, useEffect } from 'react'

// Components
import { Modalize, ModalizeProps  } from 'react-native-modalize'
import { View, Text, StyleSheet } from 'react-native'
import { Portal } from 'react-native-portalize'
import Information from './Informartion'
import Ambiance from './Ambiance'
import Pictures from './Pictures'
import Contact from './Contact'
import Address from './Address'
import Header from './Header'

// Types
import { Establishment } from '@types'


export default memo((props: Props) => {

    const modalRef = useRef<Modalize>();

    const { establishment } = props;

    return (
        <Portal>
            <Modalize
                closeSnapPointStraightEnabled={false}
                onBackButtonPress={onBackButtonPress}
                closeAnimationConfig={closeConfig}
                scrollViewProps={scrollViewProps}
                openAnimationConfig={openConfig}
                // panGestureAnimatedValue={panY}
                overlayStyle={styles.overlay}
                // contentRef={scrollViewRef}
                panGestureComponentEnabled
                modalStyle={styles.modal}
                disableScrollIfPossible
                adjustToContentHeight
                velocity={undefined}
                tapGestureEnabled
                alwaysOpen={300}
                useNativeDriver
                threshold={400}
                snapPoint={250}
                dragToss={0.3}
                ref={modalRef}
                withHandle
            >
                <Header
                    name={establishment.name}
                    recommendationCount={20}
                />
                <Information
                    pricing={establishment.pricing}
                    rating={establishment.rating}
                />
                <Address
                    value={establishment.address}
                />
                {/* <Contact /> */}
                <Ambiance
                    types={establishment.types}
                />
                <Pictures />

                <View style={{
                    backgroundColor: 'white',
                    minHeight: 500,
                    // position: 'absolute',
                    width: '100%',
                    height: 800,
                }} />
            </Modalize>
        </Portal>
    )
})

// Styles
const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'transparent',
    },
    overlay: {
        backgroundColor: 'transparent',
    },
    container: {
        // backgroundColor: 'transparent',
        backgroundColor: 'blue',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        // overflow: 'hidden',
        // marginTop: 20,
    },
    content: {
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
})

// Constants
const scrollViewProps: ScrollViewProps = {
    contentContainerStyle: styles.content,
    keyboardShouldPersistTaps: 'handled',
    style: styles.container,
    overScrollMode: 'always',
    endFillColor: 'white',
    bounces: false,
}

const closeConfig: CloseAnimationConfig = {
    timing: { duration: 250 },
    spring: {
        stiffness: 150,
        damping: 15,
        mass: 1,
    },
}

const openConfig: OpenAnimationConfig = closeConfig

const onBackButtonPress = () => true

// Types
type Props = {
    establishment: Establishment,
    visible: boolean,
}

type CloseAnimationConfig = ModalizeProps['closeAnimationConfig']

type OpenAnimationConfig = ModalizeProps['openAnimationConfig']

type ScrollViewProps = ModalizeProps['scrollViewProps']