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

export { getCurrentDate, getPastDate, getCurrentTime };
