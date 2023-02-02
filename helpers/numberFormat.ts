const numberFormat = (number: number) => {
    const localeString = number?.toLocaleString('en-US') || '';
    const result = localeString.split(',').join('.');
    return result;
};

export default numberFormat;
