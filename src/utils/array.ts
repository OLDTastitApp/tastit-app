export const areArraysEqual = <TItem>(left: TItem[], right: TItem[]) => {
    
    const rightSet = new Set(right);
    const leftSet = new Set(left);

    if (leftSet.size !== rightSet.size) {
        return false;
    }
    
    for (const leftItem of leftSet) {
        if (!rightSet.has(leftItem)) {
            return false;
        }
    }

    return true;
}

export const padArray = <TItem>(
    array: TItem[],
    defaultValue: TItem,
    length: number,
) => {
    if (array.length >= length) {
        return array;
    }

    const remainingLength = length - array.length;
    const defaultItems = new Array(remainingLength)
        .map(_ => defaultValue);

    return [...array, ...defaultItems];
}