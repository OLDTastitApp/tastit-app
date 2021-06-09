// Utils
import {
    getStatusBarHeight, getBottomSpace, isIphoneX,
} from 'react-native-iphone-x-helper'


export const safeStatusBarHeight = getStatusBarHeight(true)

export const safeBottomSpace = getBottomSpace()

export const safePaddingTop = safeStatusBarHeight

export const safePaddingBottom = (
    safeBottomSpace + (isIphoneX() ? 0 : 10)
)