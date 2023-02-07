/* eslint-disable no-return-assign */
const convertDate = (time: any, isSlash: any = false) => {
    const dataDate = new Date(time);
    const date = dataDate.getDate();
    const month = dataDate.getMonth() + 1;
    const year = dataDate.getFullYear();
    if (isSlash) {
        return `${date}/${month}/${year}`;
    }
    return `${date}-${month}-${year}`;
};

export default convertDate;
