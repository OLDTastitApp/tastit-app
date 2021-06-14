// React
import React, { RefObject, memo, useEffect } from 'react'

// Components
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { View, Text, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

// Types
import { Place } from '@types'


export default memo((props: Props) => {

    const { modalRef, place } = props;

    useEffect(
        () => {
            if (place) {
                console.log(`Pushing !!!`)
                // modalRef.current?.snapToIndex(1);
                modalRef.current?.present();
            } else {
                modalRef.current?.dismiss();
            }
        },
        [place]
    );

    return (
        <BottomSheetModal
            // onChange={handleSheetChanges}
            // animatedIndex={animatedIndex}
            enablePanDownToClose={true}
            // activeOffsetY={1}
            // bottomInset={100}
            // failOffsetY={1}
            // overDragResistanceFactor={0}
            // enableHandlePanningGesture
            // enableDismissOnClose
            // enableOverDrag
            onDismiss={() => {
                console.log(`DISMISSING !!!!!!!!`)
            }}
            snapPoints={snapPoints}
            handleComponent={null}
            stackBehavior='push'
            ref={modalRef}
            index={0}
        >
            <View style={{
                backgroundColor: 'purple',
                minHeight: 500,
            }}>
                <Text>
                    PLACE DETAILS
                </Text>
            </View>
        </BottomSheetModal>
    )
})

// Constants
// const snapPoints = ['10%', '50%', '90%']
const snapPoints = ['90%']

// Types
export type Props = {
    modalRef: RefObject<BottomSheetModal>,
    place?: Place,
}