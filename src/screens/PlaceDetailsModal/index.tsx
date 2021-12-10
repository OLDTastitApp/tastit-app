// React
import React, { RefObject, memo, useEffect, useMemo, useState, useCallback } from 'react'

// Components
import { View, Text, Image, FlatList, StyleSheet, Dimensions, Linking, Platform } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView as RNGHScrollView } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TouchableScale, Rating, Timetable } from '@components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Animated from 'react-native-reanimated'
import RateModal from './RateModal'
import PostItem from './PostItem'

// Icons
import HeartFilledIcon from '@assets/icons/heart-filled.svg'
import HeartIcon from '@assets/icons/heart.svg'

// Helpers
import { usePlace, useRatePlace, useLikePlace, useDislikePlace } from '@helpers'
import { useNavigation } from '@navigation/utils'

// Utils
import Share from 'react-native-share'

// Constants
import { color, ui } from '@constants'

// Types
import { Place } from '@types'


const HorizontalFlatList = Platform.OS === 'ios'
    ? Animated.ScrollView
    : RNGHScrollView;

export default memo((props: Props) => {

    const navigation = useNavigation();

    const { modalRef, onClosed, animatedPosition } = props;

    const [ratingModalVisible, setRatingModalVisible] = useState(false);

    const [place, placeResult] = usePlace({ id: props.place?.id });

    const [dislikePlace, dislikePlaceResult] = useDislikePlace();
    const [likePlace, likePlaceResult] = useLikePlace();
    const [ratePlace, ratePlaceResult] = useRatePlace();

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

    const { tags } = useMemo(
        () => {
            if (!place) return {};

            const tags = place.tags?.map(
                ({ name }) => name
            ).join('  -  ');

            // const timetable = 

            return { tags };
        },
        [place?.tags]
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

    const onRatePress = () => setRatingModalVisible(true);

    const onCancelRating = useCallback(() => setRatingModalVisible(false), []);

    const onSubmitRating = useCallback(
        async (value: number) => {
            try {
                await ratePlace({
                    placeId: props.place?.id,
                    rating: value,
                });
            } catch (e) {
                console.log(e);
            }
            setRatingModalVisible(false);
        },
        [props.place?.id]
    );

    // if (place == null) return null;

    const LikeIcon = place?.liked ? HeartFilledIcon : HeartIcon;

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

    const onMapPress = () => {
        const url = Platform.OS === 'ios'
            ? `maps:0,0?q=${place.name}@${place.latitude},${place.longitude}`
            : `geo:0,0?q=${place.latitude},${place.longitude}(${place.name})`;
        Linking.openURL(url);
    };
    
    const onPhonePress = () => {
        Linking.openURL(`tel:${place.phoneNumber}`);
    };

    const onWebsitePress = () => {
        // Linking.openURL(`https://${place.website}`);
        Linking.openURL(place.website);
    };

    const onSharePress = () => {
        Share.open({
            title: place.name,
            message: `Clic sur le lien suivant pour le lieu suivant tastit://place/${place.id}`,
        });
    };

    const alreadyRated = place?.userRating !== null;

    return (
        <BottomSheetModal
            animatedPosition={animatedPosition}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            handleComponent={null}
            enableDismissOnClose
            onDismiss={onClosed}
            // stackBehavior='push'
            ref={modalRef}
            // index={0}
        >
            {!!place && (
                <>
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
                                onPress={onSharePress}
                                style={styles.icon}
                            >
                                <Ionicons
                                    name='ios-share-social'
                                    color={color.primary}
                                    size={24}
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

                        <Text style={styles.address}>
                            {place.address}
                        </Text>

                        <View style={styles.rating}>
                            <Rating
                                alreadyRated={alreadyRated}
                                onRatePress={onRatePress}
                                value={place.rating}
                                size={18}
                            />
                        </View>

                        {place.timetable?.length > 0 && (
                            <Timetable
                                // style={{ marginHorizontal: 20 }}
                                timetable={place.timetable}
                            />
                        )}

                        <Text style={styles.category}>
                            {place.categories?.[0].name}
                        </Text>

                        <Text style={styles.tags}>
                            {/* {['French food', 'Pizza', 'Bar', 'Végératien', 'Vegan'].join(' - ')} */}
                            {tags}
                        </Text>

                        <HorizontalFlatList
                            contentContainerStyle={styles.actionContent}
                            showsHorizontalScrollIndicator={false}
                            style={styles.actionContainer}
                            horizontal
                        >
                            <TouchableScale
                                style={styles.action}
                                onPress={onMapPress}
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

                            {!!place.phoneNumber && (
                                <TouchableScale
                                    onPress={onPhonePress}
                                    style={styles.action}
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
                            )}

                            {!!place.website && (
                                <TouchableScale
                                    onPress={onWebsitePress}
                                    style={styles.action}
                                >
                                    <Feather
                                        color={color.dark}
                                        // name='external-link'
                                        // name='link'
                                        name='globe'
                                        size={16}
                                    />

                                    <Text style={styles.actionText}>
                                        Site web
                                    </Text>
                                </TouchableScale>
                            )}
                        </HorizontalFlatList>

                        <AnimatedFlatList
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

                    {/* <RateModal visible={true} /> */}
                    <RateModal
                        visible={ratingModalVisible}
                        onCancel={onCancelRating}
                        onSubmit={onSubmitRating}
                    />
                </>
            )}
        </BottomSheetModal>
    )
})

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as typeof FlatList

// export default memo((props: Props) => {
//     // const navigation = useNavigation();

//     const { modalRef, onClosed, animatedPosition } = props;

//     // const [ratingModalVisible, setRatingModalVisible] = useState(false);

//     // const [placeK, placeResult] = usePlace({ id: props.place?.id });

//     // const [dislikePlace, dislikePlaceResult] = useDislikePlace();
//     // const [likePlace, likePlaceResult] = useLikePlace();
//     // const [ratePlace, ratePlaceResult] = useRatePlace();

//     // useEffect(
//     //     () => {
//     //         if (place) {
//     //             // modalRef.current?.snapToIndex(1);
//     //             // modalRef.current?.present();
//     //         } else {
//     //             modalRef.current?.dismiss?.();
//     //         }
//     //     },
//     //     [place]
//     // );
//     const place = props.place;

//     // const { tags } = useMemo(
//     //     () => {
//     //         if (!place) return {};

//     //         const tags = place.tags?.map(
//     //             ({ name }) => name
//     //         ).join('  -  ');

//     //         // const timetable = 

//     //         return { tags };
//     //     },
//     //     [place?.tags]
//     // );

//     const LikeIcon = place?.liked ? HeartFilledIcon : HeartIcon;

//     return (
//         <BottomSheetModal
//             snapPoints={snapPoints}
//             ref={props.modalRef}
//             name='C'
//         >
//             <BottomSheetScrollView
//                 contentContainerStyle={styles.container}
//             >
//                 {!!place && (
//                     <View style={{
//                         backgroundColor: 'yellow',
//                         width: '100%',
//                         // height: 3000,
//                     }}>
//                         {/* <Text>
//                             {JSON.stringify(props.place, null, 4)}
//                         </Text> */}

//                         <Image
//                             source={{ uri: place.cover?.url }}
//                             style={styles.image}
//                         />

//                         <View style={styles.header}>
//                             <Text style={styles.name}>
//                                 {place.name}
//                             </Text>

//                             <TouchableScale
//                                 // onPress={onLikePress}
//                                 style={styles.icon}
//                             >
//                                 <LikeIcon
//                                     fill={color.primary}
//                                     height={20}
//                                     width={20}
//                                 />
//                             </TouchableScale>
//                             <TouchableScale
//                                 // onPress={onAddToListPress}
//                                 style={styles.icon}
//                             >
//                                 <Feather
//                                     // fill={color.primary}
//                                     color={color.primary}
//                                     name='plus'
//                                     size={24}
//                                 />
//                             </TouchableScale>
//                         </View>

//                         <Text style={styles.address}>
//                             {place?.address}
//                         </Text>

//                         <View style={styles.rating}>
//                             {/* <Rating
//                                 alreadyRated={false}
//                                 // alreadyRated={alreadyRated}
//                                 // onRatePress={onRatePress}
//                                 value={place.rating}
//                                 size={18}
//                             /> */}
//                         </View>

//                         {/* <Timetable
//                             // style={{ marginHorizontal: 20 }}
//                             timetable={place.timetable}
//                         /> */}

//                         <Text style={styles.category}>
//                             {place?.categories?.[0]?.name}
//                         </Text>

//                         <Text style={styles.tags}>
//                             {['French food', 'Pizza', 'Bar', 'Végératien', 'Vegan'].join(' - ')}
//                             {/* {tags} */}
//                         </Text>

//                         <Animated.ScrollView
//                             contentContainerStyle={[styles.actionContent, { flexGrow: 0 }]}
//                             showsHorizontalScrollIndicator={false}
//                             style={[styles.actionContainer, { flexGrow: 0 }]}
//                             horizontal
//                         >
//                             <TouchableScale
//                                 style={styles.action}
//                                 // onPress={onMapPress}
//                             >
//                                 <Feather
//                                     color={color.dark}
//                                     name='send'
//                                     size={16}
//                                 />

//                                 <Text style={styles.actionText}>
//                                     Direction
//                                 </Text>
//                             </TouchableScale>

//                             {!!place?.phoneNumber && (
//                                 <TouchableScale
//                                     // onPress={onPhonePress}
//                                     style={styles.action}
//                                 >
//                                     <Feather
//                                         color={color.dark}
//                                         name='phone'
//                                         size={16}
//                                     />

//                                     <Text style={styles.actionText}>
//                                         Appeler
//                                     </Text>
//                                 </TouchableScale>
//                             )}

//                             {!!place?.website && (
//                                 <TouchableScale
//                                     // onPress={onWebsitePress}
//                                     style={styles.action}
//                                 >
//                                     <Feather
//                                         color={color.dark}
//                                         // name='external-link'
//                                         // name='link'
//                                         name='globe'
//                                         size={16}
//                                     />

//                                     <Text style={styles.actionText}>
//                                         Site web
//                                     </Text>
//                                 </TouchableScale>
//                             )}
//                         </Animated.ScrollView>
//                     </View>
//                 )}
//             </BottomSheetScrollView>
//         </BottomSheetModal>
//     )  
// })

// Constants
const { width, height } = Dimensions.get('window')

const snapPoints = ['90%']

// Styles
const styles = StyleSheet.create({
    container: {
        // paddingBottom: ui.safePaddingBottom + 20,
        // paddingHorizontal: 20,
        paddingTop: 20,
        // paddingBottom: height + 300,
        paddingBottom: 120,
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
    address: {
        fontFamily: 'Avenir Next',
        color: color.mediumGray,
        marginHorizontal: 20,
        fontWeight: '500',
        fontSize: 14,
        marginTop: 5,
    },
    rating: {
        marginHorizontal: 20,
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 15,
    },
    category: {
        fontFamily: 'Avenir Next',
        marginHorizontal: 20,
        color: color.dark,
        fontWeight: '500',
        marginTop: 20,
        fontSize: 18,
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
        // left: -20,
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
    // favorited?: boolean,
    place?: Place,
}