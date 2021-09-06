// React
import React, { memo, useRef } from 'react'

// Components
import { View, Image, TextInput, StyleSheet } from 'react-native'
import ImageEditor from '@react-native-community/image-editor'
import ImageResizer from 'react-native-image-resizer'

// Utils
import { filters } from '../Screenshot/utils'
import RNFS from 'react-native-fs'

// Constants
import { font, color } from '@constants'


export default memo((props: Props) => {

    const { pictureUri, value, onChange, filter } = props;

    const onChangeText = (text: string) => {
        const k = text.match(/q/g)
        // #(\w*)$
    };

    const [_, Filter] = filters.find(
        ([name]) => name === filter
    ) ?? [];

    const onExtractImage = async (event: any) => {
        const { uri } = event.nativeEvent;
        const res = await ImageResizer.createResizedImage(uri, 1080, 1920, 'JPEG', 90);
        const value = await RNFS.readFile(res.uri, 'base64');
        props.onPictureBase64Extracted(value);
    };

    return (
        <View style={styles.container}>

            <Filter
                onExtractImage={onExtractImage}
                style={styles.picture}
                extractImageEnabled
                image={(
                    <Image
                        source={{ uri: pictureUri }}
                        style={styles.picture}
                        resizeMode='cover'
                    />
                )}
            />
            {/* <Image
                source={{ uri: pictureUri }}
                style={styles.picture}
                resizeMode='cover'
            /> */}

            <TextInput
                placeholder={placeholder}
                onChangeText={onChange}
                style={styles.input}
                numberOfLines={2}
                value={value}
                multiline
            />
        </View>
    )
})

// Constants
const placeholder =
`Écrire un commentaire...
#tags ...
`

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        // height: 100,
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'flex-start',
        // height: 120,
        marginBottom: 20,
    },
    picture: {
        // marginRight: 20,
        height: 150,
        width: 100,
    },
    input: {
        // backgroundColor: 'purple',
        justifyContent: 'flex-start',
        // fontFamily: font.regular,
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        // paddingVertical: 10,
        color: color.dark,
        marginLeft: 20,
        maxHeight: 150,
        height: '100%',
        fontSize: 18,
        flex: 1,
    },
})

// Types
type Props = {
    onPictureBase64Extracted: (value: string) => void,
    onChange: (value: string) => void,
    pictureUri: string,
    filter: string,
    value: string,
}