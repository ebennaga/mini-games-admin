/* eslint-disable no-return-assign */
const convertDate = (time: any, isSlash: any = false) => {
    const date = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    if (isSlash) {
        return `${date}/${month}/${year}`;
    }
    return `${date}-${month}-${year}`;
};

export default convertDate;
