/* eslint-disable no-return-assign */
const convertDate = (time: any) => {
    const date = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    return `${date}-${month}-${year}`;
};

export default convertDate;
