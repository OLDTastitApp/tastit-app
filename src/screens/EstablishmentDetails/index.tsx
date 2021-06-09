// React
import React, { memo, useRef, useState, useEffect } from 'react'

// Components
import { Modalize, ModalizeProps  } from 'react-native-modalize'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Portal } from 'react-native-portalize'
import FriendRating from './FriendRating'
import Information from './Informartion'
import Header from './Header'
import Footer from './Footer'

// Data
import { posts } from '../Home/data'

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
                // panGestureComponentEnabled
                modalStyle={styles.modal}
                handlePosition='inside'
                handleStyle={{
                    backgroundColor: 'white',
                }}
                // disableScrollIfPossible
                // adjustToContentHeight
                // velocity={undefined}
                // tapGestureEnabled
                alwaysOpen={300}
                useNativeDriver
                threshold={400}
                snapPoint={250}
                dragToss={0.3}
                ref={modalRef}
                withHandle
            >
                <Header
                    coverUri={establishment.cover.value}
                />
                <Information
                    item={establishment}
                />

                <FlatList
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        // paddingBottom: 50,
                        paddingBottom: 10,
                    }}
                    renderItem={({ item }) => (
                        <FriendRating
                            item={item}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={({ id }) => id}
                    data={posts}
                    horizontal
                />

                <Footer />

                {/* <View style={{
                    backgroundColor: 'blue',
                    minHeight: 500,
                    // position: 'absolute',
                    width: '100%',
                    height: 800,
                }} /> */}
            </Modalize>
        </Portal>
    )
})

// Styles
const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
    },
    overlay: {
        backgroundColor: 'transparent',
    },
    container: {
        // backgroundColor: 'transparent',
        // backgroundColor: 'blue',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        // overflow: 'hidden',
        // marginTop: 20,
    },
    content: {
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
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