const getPastDate = (past: number) => {
    if (typeof window !== 'undefined') {
        const d = new Date(); // today!
        const x = past; // go back 5 days!
        d.setDate(d.getDate() - x);
        return String(d);
    }
    return false;
};

export default getPastDate;
