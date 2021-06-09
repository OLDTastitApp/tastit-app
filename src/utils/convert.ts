// Converters
const converterMap: {
    [type: string]: (value: any) => string,
} = {
    object: (value: object) => JSON.stringify(value),
    number: (value: number) => `${value}`,
    string: (value: string) => value,
    // date: ...
}

export const toStringSafe = (value: any) => {
    const type = typeof value;
    const toString = converterMap[type];

    return value != null
        ? toString(value)
        : '';
}