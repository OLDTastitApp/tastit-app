// React
import React, { RefObject, memo, useCallback, useMemo, useState } from 'react'

// Components
import { View, Text, Image, ScrollView, FlatList, StyleSheet, Dimensions, Linking, Platform } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TouchableScale, Rating, Timetable } from '@components'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Animated from 'react-native-reanimated'
import RateModal from './RateModal'
import PostItem from './PostItem'
import NavBar from './NavBar'

// Icons
import HeartFilledIcon from '@assets/icons/heart-filled.svg'
import HeartIcon from '@assets/icons/heart.svg'
import UsersIcon from '@assets/icons/users.svg'

// Helpers
import { usePlace, useRatePlace, useLikePlace, useDislikePlace } from '@helpers'
import { useNavigation, useRoute } from '@navigation/utils'

// Constants
import { color, ui } from '@constants'

// Types
import { Place } from '@types'


export default memo(() => {

    const navigation = useNavigation();
    const { params } = useRoute<'PlaceDetails'>();

    const [ratingModalVisible, setRatingModalVisible] = useState(false);

    // const { modalRef, onClosed, animatedPosition } = props;

    // const [place, placeResult] = usePlace({ id: props.place?.id });
    const [place, placeResult] = usePlace({ id: params.placeId });

    const [dislikePlace, dislikePlaceResult] = useDislikePlace();
    const [likePlace, likePlaceResult] = useLikePlace();
    const [ratePlace, ratePlaceResult] = useRatePlace();

    // useEffect(
    //     () => {
    //         if (place) {
    //             // modalRef.current?.snapToIndex(1);
    //             modalRef.current?.present();
    //         } else {
    //             modalRef.current?.dismiss();
    //         }
    //     },
    //     [place]
    // );

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

    // if (placeResult) {
    //     return (
    //         <ScrollView contentContainerStyle={{ paddingTop: 100, backgroundColor: 'white' }}>
    //             <Text>
    //                 {JSON.stringify(tags, null, 4)}
    //                 {JSON.stringify(placeResult.data, null, 4)}
    //             </Text>
    //         </ScrollView>
    //     )
    // }

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
        Linking.openURL(`phone:${place.phoneNumber}`);
    };

    const onWebsitePress = () => {
        Linking.openURL(`https://${place.website}`);
    };

    const onRatePress = () => setRatingModalVisible(true);

    const onCancelRating = useCallback(() => setRatingModalVisible(false), []);

    const onSubmitRating = useCallback(
        async (value: number) => {
            try {
                await ratePlace({
                    placeId: place.id,
                    rating: value,
                });
            } catch (e) {
                console.log(e);
            }
            setRatingModalVisible(false);
        },
        []
    );

    if (place == null) {
        console.log(JSON.stringify(placeResult.error, null, 4));
        return null;
    }

    const alreadyRated = place.userRating !== null;

    // console.log('place: ', JSON.stringify(place, null, 4));

    return (
        <>
            <ScrollView
                // contentContainerStyle={styles.container}
                contentContainerStyle={{ paddingBottom: 100 }}
                style={{ backgroundColor: 'white' }}
                showsVerticalScrollIndicator={false}
            >
                <NavBar
                    onBackPress={navigation.goBack}
                />

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

                <Timetable
                    // style={{ marginHorizontal: 20 }}
                    timetable={place.timetable}
                />

                <Text style={styles.category}>
                    {place.categories?.[0].name}
                </Text>

                <Text style={styles.tags}>
                    {/* {['French food', 'Pizza', 'Bar', 'Végératien', 'Vegan'].join(' - ')} */}
                    {tags}
                </Text>

                <ScrollView
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
                </ScrollView>

                {place.recommendationCount > 0 && (
                    <View style={styles.recommendation}>
                        <View style={styles.recommendationIcon}>
                            <UsersIcon width={26} height={26} />
                        </View>

                        <Text
                            style={styles.recommendationCount}
                            adjustsFontSizeToFit
                            numberOfLines={1}
                        >
                            {place.recommendationCount} amis ont recommandé ce lieu
                        </Text>
                    </View>
                )}

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
            </ScrollView>

            <RateModal
                visible={ratingModalVisible}
                onCancel={onCancelRating}
                onSubmit={onSubmitRating}
            />
        </>
    )
})

// Constants
const { width, height } = Dimensions.get('window')

const snapPoints = ['90%']

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // paddingBottom: ui.safePaddingBottom + 20,
        // paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: height + 300,
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
    recommendation: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    recommendationIcon: {
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        padding: 10,
    },
    recommendationCount: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '500',
        marginLeft: 10,
        fontSize: 16,
    },
})