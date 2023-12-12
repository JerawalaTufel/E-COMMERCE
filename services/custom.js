
const otpGenerate = () => {
    const n = 5;
    const characters = '1234567890';
    let randomString = '';

    for (let i = 0; i < n; i++) {
        const index = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(index);
    }
    
    return randomString;
}

module.exports = {
    otpGenerate
}