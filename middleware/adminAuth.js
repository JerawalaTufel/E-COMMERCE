const { User } = require("../models/user");
const { isTokenExpired } = require("../services/jwtExpireOrNot");
const { getToken } = require("../services/tokenExraction")
const jwt = require('jsonwebtoken');
const VefiryUserWithToken = (req , res , next) => {
    getToken(req , res ,  async (token) => {
        if(token){
            const isExpired = isTokenExpired(token);
            console.log(isExpired);
            if(!isExpired){

                const decoded = jwt.verify(token, process.env.secretKey); // Replace 'your-secret-key' with your actual secret key
                const user = await User.findOne({_id : decoded.id});
                if(!user) return res.status(400).send('taru mo jo login kar and sacho token pass kar....')
                req.userId = user._id;
                next()

            } else{
                return res.status(400).send('taru mo jo login kar kem ke token expire thai gayu')
            }
        }
    })
}

module.exports = {VefiryUserWithToken}