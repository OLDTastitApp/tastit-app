// React
import React, { PureComponent } from 'react'

// Components
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

// Constants
import { font, color } from '@constants'

// Types
import { LayoutChangeEvent, LayoutRectangle } from 'react-native'


export default class BackItem extends PureComponent<Props> {

    handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
        const { index, onLayout } = this.props;
        const { layout } = nativeEvent;
        onLayout({ layout, index });
    }

    handlePress = () => {
        const { item, index, onPress } = this.props;
        onPress({ item, index });
    }

    render() {
        const { item, color } = this.props;
        return (
            <TouchableOpacity
                onLayout={this.handleLayout}
                onPress={this.handlePress}
                style={styles.container}
                activeOpacity={0.95}
            >
                <Text
                    style={[
                        styles.name,
                        // { color },
                    ]}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }
}

// Props
(BackItem as any).defaultProps = {
    onLayout: () => {},
    onPress: () => {},
    color: color.dark,
}

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        // paddingHorizontal: 20,
        paddingVertical: 5,

        // Added:
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 15,
        marginHorizontal: 5,
        borderRadius: 100,
    },
    name: {
        // fontFamily: font.regular,
        fontFamily: 'Avenir Next',
        textAlign: 'center',
        fontWeight: '500',
        // color: 'white',
        fontSize: 16,

        // Added
        color: '#646E75',
    },
})

// Types
type Props = {
    onLayout?: (event: {
        layout: LayoutRectangle,
        index: number,
    }) => void,
    // @REFACTOR
    onPress?: (item: any) => void,
    color?: string,
    index?: number,
    item: {
        name: string,
    },
    size?: {
        height: number,
        width: number,
    },
}