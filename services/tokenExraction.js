
const getToken = (req , res , cb) => {
    const authorizationHeader = req.headers['authorization'];
    if(!authorizationHeader) return res.status(400).send('taru mo jo and pachhi token pass kar....')
    const token = authorizationHeader.substring('Bearer '.length);
    cb(token);
}

module.exports = {getToken}