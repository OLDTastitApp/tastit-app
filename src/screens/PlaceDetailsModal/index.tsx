// React
import React, { RefObject, memo, useEffect } from 'react'

// Components
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { TouchableScale, Rating, Timetable } from '@components'
import Feather from 'react-native-vector-icons/Feather'
import Animated from 'react-native-reanimated'

// Constants
import { color, ui } from '@constants'

// Types
import { Place } from '@types'


export default memo((props: Props) => {

    const { modalRef, place, onClosed, animatedPosition } = props;

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

    if (place == null) return null;

    return (
        <BottomSheetModal
            handleComponent={null}
            animatedPosition={animatedPosition}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            enableDismissOnClose
            onDismiss={onClosed}
            stackBehavior='push'
            ref={modalRef}
            index={0}
        >
            <View style={styles.handle} />

            <BottomSheetScrollView
                contentContainerStyle={styles.container}
            >
                <Image
                    source={{ uri: place.cover }}
                    style={styles.image}
                />

                <Text style={styles.name}>
                    {place.name}
                </Text>

                <View style={styles.rating}>
                    <Rating
                        onRatePress={() => {}}
                        value={place.rating}
                        size={18}
                    />
                </View>

                <Timetable />

                <Text style={styles.tags}>
                    {['French food', 'Pizza', 'Bar', 'Végératien', 'Vegan'].join(' - ')}
                </Text>

                <ScrollView
                    contentContainerStyle={styles.actionContent}
                    style={styles.actionContainer}
                    horizontal
                >
                    <TouchableScale
                        style={styles.action}
                        onPress={() => {}}
                    >
                        <Feather
                            color={color.dark}
                            name='send'
                            size={16}
                        />

                        <Text style={styles.actionText}>
                            Direction
                        </Text>
                    </TouchableScale>

                    <TouchableScale
                        style={styles.action}
                        onPress={() => {}}
                    >
                        <Feather
                            color={color.dark}
                            name='phone'
                            size={16}
                        />

                        <Text style={styles.actionText}>
                            Appeler
                        </Text>
                    </TouchableScale>
                </ScrollView>

                {/* <Text>
                    {JSON.stringify(place, null, 4)}
                </Text> */}
            </BottomSheetScrollView>
        </BottomSheetModal>
    )
})

// Constants
const { width } = Dimensions.get('window')

const snapPoints = ['90%']

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: ui.safePaddingBottom + 20,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    handle: {
        backgroundColor: color.lightGray,
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 6,
        marginTop: 20,
        width: 40,
        height: 6,
    },
    image: {
        borderRadius: 20,
        height: 300,
    },
    name: {
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        color: color.dark,
        marginTop: 20,
        fontSize: 24,
    },
    rating: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 15,
    },
    tags: {
        fontFamily: 'Avenir Next',
        fontWeight: '400',
        color: color.dark,
        marginTop: 10,
        fontSize: 18,
    },
    actionContainer: {
        left: -20,
        width,
    },
    actionContent: {
        paddingHorizontal: 10,
        marginVertical: 10,
        marginTop: 20,
    },
    action: {
        borderColor: '#C0C2C7',
        paddingHorizontal: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    actionText: {
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        color: color.dark,
        marginLeft: 10,
        fontSize: 16,
    },
})

// Types
export type Props = {
    animatedPosition: Animated.SharedValue<number>,
    modalRef: RefObject<BottomSheetModal>,
    onClosed: () => void,
    place?: Place,
}