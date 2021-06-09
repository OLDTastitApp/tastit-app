// React
import React, { Component } from 'react'

// Components
import { TouchableWithoutFeedback, Animated } from 'react-native'

// Types
import { StyleProp, ViewStyle, TouchableWithoutFeedbackProps } from 'react-native'


export default class TouchableScale extends Component<Props> {

    scale = new Animated.Value(this.props.defaultScale)

    value = (prop: string, defaultProp: string) => {
        return typeof this.props[prop] !== 'undefined'
            ? this.props[prop]
            : this.props[defaultProp]
    }

    onPressIn: TouchableWithoutFeedbackProps['onPressIn'] = (...args) => {

        const { useNativeDriver, activeScale: toValue } = this.props;

        const friction = this.value('pressInFriction', 'friction');
        const tension = this.value('pressInTension', 'tension');

        const config = { useNativeDriver, friction, toValue, tension };

        Animated.spring(this.scale, config).start();

        if (this.props.onPressIn) {
            this.props.onPressIn(...args);
        }
    }

    onPressOut: TouchableWithoutFeedbackProps['onPressOut'] = (...args) => {

        const { useNativeDriver, defaultScale: toValue } = this.props;

        const friction = this.value('pressOutFriction', 'friction');
        const tension = this.value('pressOutTension', 'tension');

        const config = { useNativeDriver, friction, toValue, tension };

        Animated.spring(this.scale, config).start();

        if (this.props.onPressOut) {
            this.props.onPressOut(...args);
        }
    }

    render() {
        const { style, ...props } = this.props;

        return (
            <TouchableWithoutFeedback
                {...props}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
            >
                <Animated.View
                    style={[
                        style,
                        {
                            transform: [
                                { scale: this.scale },
                            ],
                        },
                    ]}
                >
                    {this.props.children}
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

// Props
(TouchableScale as any).defaultProps = {
    useNativeDriver: true,
    activeScale: 0.98,
    defaultScale: 1,
    tension: 150,
    friction: 3,
} as Partial<Props>

// Types
export type Props = TouchableWithoutFeedbackProps & {
    // style?: StyleProp<TouchableWithoutFeedbackProps['style']>,
    style?: StyleProp<ViewStyle>,
    useNativeDriver?: boolean,
    pressOutFriction?: number,
    pressInFriction?: number,
    pressOutTension?: number,
    pressInTension?: number,
    defaultScale?: number,
    activeScale?: number,
    friction?: number,
    tension?: number,
}