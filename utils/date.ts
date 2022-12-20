const getCurrentDate = (isStrip?: boolean) => {
    let today: any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = isStrip ? `${yyyy}-${mm}-${dd}` : `${dd}/${mm}/${yyyy}`;
    return String(today);
};

const getPastDate = (past: number, isStrip: boolean = false) => {
    const date = new Date();
    date.setDate(date.getDate() - past);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return isStrip ? `${yyyy}-${mm}-${dd}` : `${dd}/${mm}/${yyyy}`;
};

const getCurrentTime = () => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const result = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
    return result;
};

const getStartDate = () => {
    const date: any = new Date();

    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = date.getFullYear();

    return `${yyyy}-${mm}-01`;
};

const getEndDdate = () => {
    const date = new Date();
    const mm = date.getMonth();
    const yyyy = date.getFullYear();

    const lastDay = new Date(yyyy, mm + 1, 0);

    const dd = lastDay.getDate();

    return `${yyyy}-${mm + 1}-${dd}`;
};

const getSplitDate = (date: any) => {
    const thisdate = new Date(date);
    // const mm = thisdate.getMonth();
    // const yyyy = thisdate.getFullYear();
    // const dd = thisdate.getDate();
    const hour = thisdate.getHours();
    const minute = thisdate.getMinutes();
    const time = `${hour < 10 ? `0${hour}` : `${hour}`}:${minute < 10 ? `0${minute}` : `${minute}`}`;
    // const localDate = `${yyyy}-${mm < 10 ? `0${mm}` : mm}-${dd < 10 ? `0${dd}` : dd}`;

    const localDate = thisdate.toJSON().slice(0, 10);

    return { date: localDate, time };
};

export { getCurrentDate, getPastDate, getCurrentTime, getStartDate, getEndDdate, getSplitDate };
