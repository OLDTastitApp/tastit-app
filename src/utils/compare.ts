// Utils
import rnDeepDiffer from 'react-native/Libraries/Utilities/differ/deepDiffer'


export const deepDiffer = (left: object, right: object) => {
    return rnDeepDiffer(left, right);
}