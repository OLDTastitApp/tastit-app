// React
import React, { RefObject, memo, useEffect } from 'react'

// Components
import { View, Text, Image, ScrollView, FlatList, StyleSheet, Dimensions } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TouchableScale, Rating, Timetable } from '@components'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Animated from 'react-native-reanimated'
import PostItem from './PostItem'

// Icons
import HeartFilledIcon from '@assets/icons/heart-filled.svg'
import HeartIcon from '@assets/icons/heart.svg'

// Helpers
import { usePlace, useLikePlace, useDislikePlace } from '@helpers'
import { useNavigation } from '@navigation/utils'

// Constants
import { color, ui } from '@constants'

// Types
import { Place } from '@types'


export default memo((props: Props) => {

    const navigation = useNavigation();

    const { modalRef, onClosed, animatedPosition } = props;

    const [place, placeResult] = usePlace({ id: props.place?.id });

    const [dislikePlace, dislikePlaceResult] = useDislikePlace();
    const [likePlace, likePlaceResult] = useLikePlace();

    useEffect(
        () => {
            if (place) {
                // modalRef.current?.snapToIndex(1);
                modalRef.current?.present();
            } else {
                modalRef.current?.dismiss();
            }
        },
        [place]
    );

    // if (placeResult.error) {
    //     return (
    //         <ScrollView contentContainerStyle={{ paddingTop: 100, backgroundColor: 'white' }}>
    //             <Text>
    //                 {JSON.stringify(placeResult.error, null, 4)}
    //             </Text>
    //         </ScrollView>
    //     )
    // }

    if (place == null) return null;

    const LikeIcon = place.liked ? HeartFilledIcon : HeartIcon;

    const onLikePress = async () => {
        if (place.liked) {
            const res = await dislikePlace({ placeId: place.id });
            // console.log(JSON.stringify(res, null, 4))
        } else {
            const res = await likePlace({ placeId: place.id });
            // console.log(JSON.stringify(res, null, 4));
        }
    };

    const onAddToListPress = () => {
        navigation.navigate('AddPlace', { placeId: place.id });
    };

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
                    source={{ uri: place.cover?.url }}
                    style={styles.image}
                />

                <View style={styles.header}>
                    <Text style={styles.name}>
                        {place.name}
                    </Text>

                    <TouchableScale
                        onPress={onLikePress}
                        style={styles.icon}
                    >
                        <LikeIcon
                            fill={color.primary}
                            height={20}
                            width={20}
                        />
                    </TouchableScale>
                    <TouchableScale
                        onPress={onAddToListPress}
                        style={styles.icon}
                    >
                        <Feather
                            // fill={color.primary}
                            color={color.primary}
                            name='plus'
                            size={24}
                        />
                    </TouchableScale>
                </View>

                <View style={styles.rating}>
                    <Rating
                        onRatePress={() => {}}
                        value={place.rating}
                        size={18}
                    />
                </View>

                <Timetable style={{ marginHorizontal: 20 }} />

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

                <FlatList
                    renderItem={({ item }) => (
                        <PostItem
                            item={item.node}
                        />
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        marginTop: 20,
                    }}
                    keyExtractor={({ node: { id } }) => id}
                    data={place?.posts?.edges}
                    horizontal
                />
                {/* <Text>
                    {JSON.stringify(place, null, 4)}
                </Text> */}
            </BottomSheetScrollView>
        </BottomSheetModal>
    )
})

// Constants
const { width, height } = Dimensions.get('window')

const snapPoints = ['90%']

// Styles
const styles = StyleSheet.create({
    container: {
        // paddingBottom: ui.safePaddingBottom + 20,
        // paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: height + 300,
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
        marginHorizontal: 20,
        borderRadius: 20,
        height: 300,
    },
    header: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginTop: 20,
    },
    name: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: color.dark,
        fontSize: 24,
        flex: 1,
    },
    icon: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    rating: {
        marginHorizontal: 20,
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 15,
    },
    tags: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
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
        marginHorizontal: 20,
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
    favorited?: boolean,
    place?: Place,
}