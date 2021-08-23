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

    const { barStyle = 'dark-content', canSubmit } = props;

    return (
        <>
            <View style={styles.container}>

                <StatusBar barStyle={barStyle} />
                
                <TouchableScale
                    onPress={props.onBackPress}
                    style={styles.left}
                >
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
                    Rechercher
                </Text>

                <TouchableScale
                    onPress={props.onSubmitPress}
                    disabled={!props.canSubmit}
                    style={styles.right}
                >
                    <Text
                        style={[
                            styles.submit,
                            !canSubmit && styles.disabled,
                        ]}
                    >
                        {/* Terminer */}
                    </Text>
                </TouchableScale>
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
                    onChangeText={props.onSearchTextChanged}
                    placeholderTextColor={color.mediumGray}
                    placeholder='Rechercher ...'
                    value={props.searchText}
                    // onFocus={props.onFocus}
                    // onBlur={props.onBlur}
                    style={styles.input}
                    autoCorrect={false}
                    autoFocus
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
        fontFamily: 'Avenir Next',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 22,
        flex: 1,
    },
    left: {
        justifyContent: 'center',
        height: 50,
        width: 100,
    },
    right: {
        alignItems: 'flex-end',
        width: 100,
    },
    submit: {
        fontFamily: 'Avenir Next',
        color: color.primary,
        fontWeight: '600',
        fontSize: 16,
    },
    disabled: {
        color: color.mediumGray,
    },
    bar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 20,
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
    onSearchTextChanged: (value: string) => void,
    barStyle?: StatusBarProps['barStyle'],
    onSubmitPress: () => void,
    onBackPress: () => void,
    canSubmit: boolean,
    searchText: string,
}