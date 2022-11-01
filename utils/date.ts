const getCurrentDate = () => {
    let today: any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${dd}/${mm}/${yyyy}`;
    return String(today);
};

const getPastDate = (past: number) => {
    const date = new Date();
    date.setDate(date.getDate() - past);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};

export { getCurrentDate, getPastDate };
