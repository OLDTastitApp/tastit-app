// React
import React, { memo } from 'react'

// Components
import { View, TextInput, Text, StatusBar, StyleSheet } from 'react-native'
import ArrowLeftIcon from '@assets/images/arrow-left.svg'
import Feather from 'react-native-vector-icons/Feather'
import SearchIcon from '@assets/images/search.svg'
import { TouchableScale } from '@components'

// Constants
import { font, ui, color } from '@constants'

// Types
import { StatusBarProps } from 'react-native'


export default memo((props: Props) => {

    const { barStyle = 'dark-content' } = props;

    return (
        <>
            <View style={styles.container}>

                <StatusBar barStyle={barStyle} />
                
                <TouchableScale
                    onPress={props.onBackPress}
                    style={styles.left}
                >
                    {/* <Feather
                        name='arrow-left'
                        size={26}
                    /> */}
                    <ArrowLeftIcon
                        fill={color.dark}
                        height={20}
                        width={20}
                    />
                </TouchableScale>

                <Text
                    adjustsFontSizeToFit
                    style={styles.title}
                    numberOfLines={1}
                >
                    {/* Où êtes vous ? */}
                    {/* Tagger des amis */}
                </Text>

                <View style={styles.right} />
            </View>
            

            <View
                style={[
                    styles.shadow,
                    styles.bar,
                ]}
            >
                <SearchIcon
                    fill={color.dark}
                    height={20}
                    width={20}
                />
                <TextInput
                    // onChangeText={props.onSearchTextChanged}
                    placeholderTextColor={color.mediumGray}
                    placeholder='Rechercher ...'
                    // value={props.searchText}
                    // onFocus={props.onFocus}
                    // onBlur={props.onBlur}
                    style={styles.input}
                    autoCorrect={false}
                />
            </View>
        </>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: ui.safePaddingTop,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        // fontFamily: font.bold,
        fontFamily: 'Avenir Next',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 22,
        flex: 1,
    },
    left: {
        justifyContent: 'center',
        height: 50,
        width: 50,
    },
    right: {
        height: '100%',
        width: 50,
    },
    bar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        borderRadius: 14,
        paddingLeft: 15,
        // marginTop: 15,
    },
    shadow: {
        shadowColor: '#000',
        shadowOpacity: 0.20,
        shadowRadius: 4.65,
        elevation: 8,
        shadowOffset: {
            height: 4,
            width: 0,
        },
    },
    input: {
        fontFamily: font.regular,
        paddingHorizontal: 15,
        paddingVertical: 15,
        color: color.dark,
        fontSize: 16,
        flex: 1,
    },
})

// Types
type Props = {
    barStyle?: StatusBarProps['barStyle'],
    onBackPress: () => void,
}