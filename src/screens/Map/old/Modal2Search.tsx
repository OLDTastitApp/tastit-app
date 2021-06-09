// React
import React, { memo, useEffect, useRef, useState } from 'react'

// Components
import { TextInput, Text, Animated, StyleSheet, View, useWindowDimensions } from 'react-native'
import { Value } from 'react-native-reanimated'
// import { Modalize } from 'react-native-modalize'
import { Modalize, ModalizeProps } from './Modalize'
import { Portal } from 'react-native-portalize'


export default memo((props: Props) => {

    const { current: scrollY } = useRef(new Animated.Value(0));
    const [search, setSearch] = useState<string>();
    const modalRef = useRef<Modalize>();

    const onFocus = () => {
        // modalRef.current.open('top');
        modalRef.current.open('top');
        // Animated.spring(scrollY, { toValue: 1, useNativeDriver: true }).start();
    };

    // useEffect(
    //     () => {
    //         setTimeout(() => {
    //             modalRef.current.open('top');
    //         }, 3000)
    //     },
    //     []
    // );

    const { height } = useWindowDimensions();
    // console.log(height)

    return (
        <Portal>
            <Modalize
                // closeAnimationConfig={{
                //     spring: { tension: 0 },
                //     timing: { duration: 4000 },
                //   }}
                openAnimationConfig={{
                    timing: { duration: 4000 },
                    // spring: { tension: 200 },
                    spring: {
                        // speed: 0.1,
                        stiffness: 150,
                        damping: 15,
                        mass: 1,
                    },
                }}
                dragToss={0.3}
                panGestureAnimatedValue={scrollY}
                // tapGestureEnabled={false}
                // modalTopOffset={-20}
                withHandle={false}
                // tapGestureEnabled={false}
                closeSnapPointStraightEnabled={false}
                scrollViewProps={{
                    // scrollEnabled: scrollEnabled,
                    style: styles.container,
                    overScrollMode: 'always',
                    // keyboardDismissMode: 'none',
                    bounces: false,
                    endFillColor: 'white',
                    keyboardShouldPersistTaps: 'handled',
                    contentContainerStyle: {
                        backgroundColor: 'white',
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                    },
                }}
                // modalHeight={900}
                disableScrollIfPossible
                // velocity={300}
                velocity={undefined}
                threshold={400}
                // closeSnapPointStraightEnabled={false}
                overlayStyle={{ backgroundColor: 'transparent' }}
                modalStyle={{
                    backgroundColor: 'transparent'
                }}
                onBackButtonPress={() => true}
                alwaysOpen={300}
                useNativeDriver
                snapPoint={300}
                ref={modalRef}
            >
                <TextInput
                    style={{
                        backgroundColor: '#f8f8f8',
                        paddingVertical: 10,
                        marginHorizontal: 20,
                        paddingHorizontal: 10,
                        marginTop: 20,
                        borderRadius: 5,
                    }}
                    placeholder='Restaurant à Paris'
                    placeholderTextColor='#bbb'
                    // onChangeText={setSearch}
                    onFocus={onFocus}
                    value={search}
                />
                <View style={{
                    backgroundColor: 'white',
                    minHeight: 500,
                }} />
            </Modalize>
        </Portal>
    )
})

// Constants
// const 

// Styles
const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: 'transparent',
        marginTop: 20,
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30,
        overflow: 'hidden',
    },
})

// Types
export type Props = {
    // scrollEnabled: boolean,
    // onClose: () => void,
}

export type Ref = Modalize

type CloseAnimationConfig = ModalizeProps['closeAnimationConfig']

type OpenAnimationConfig = ModalizeProps['openAnimationConfig']