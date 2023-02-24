/* eslint-disable no-plusplus */
const getRandomColor = () => {
    let color = '';
    for (let i = 0; i < 1; i++) {
        const letters = '0123456789ABCDEF'.split('');
        color = `#${letters[Math.floor(Math.random() * 16)]}`;
        for (let x = 0; x < 6; x++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    }
    return color;
};

export default getRandomColor;
