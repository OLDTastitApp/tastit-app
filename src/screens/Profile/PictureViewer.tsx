// React
import React, { memo, forwardRef, useMemo, useState, useRef, useImperativeHandle } from 'react'

// Components
import { Animated, Modal, StyleSheet } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import Image from 'react-native-fast-image'

// Types
import { Post } from '@types'


export default memo(forwardRef<Ref, Props>((props, ref) => {

    const { data } = props;

    const { current: opacity } = useRef(new Animated.Value(0));
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState<number>();

    useImperativeHandle(ref, () => ({ dismiss, show }), [data]);

    const show = (item: Post) => {
        setIndex(data.findIndex(v => v === item));
        opacity.setValue(1);
        setVisible(true);
    };

    const dismiss = () => {
        Animated.spring(opacity, {
            useNativeDriver: true,
            toValue: 0,
        }).start(() => {
            setVisible(false);
        });
    };

    const images = useMemo(
        () => data.map(({ picture }) => ({ url: picture.url })),
        [data]
    );

    return (
        <Modal
            visible={visible}
            transparent
        >
            <Animated.View
                style={[
                    styles.container,
                    { opacity },
                ]}
            >
                <ImageViewer
                    onSwipeDown={dismiss}
                    flipThreshold={200}
                    onChange={setIndex}
                    imageUrls={images}
                    enableSwipeDown
                    useNativeDriver
                    enablePreload
                    index={index}
                    renderImage={props => (
                        <Image {...props} />
                    )}
                />
            </Animated.View>
        </Modal>
    )
}))

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

// Types
export type Props = {
    data: Post[],
}

export type Ref = {
    show: (item: Post) => void,
    dismiss: () => void,
}