const { User } = require("../models/user")
const { getToken } = require("../services/tokenExraction")

const VefiryUserWithToken = (req , res , next) => {
    getToken(req , res ,  async (token) => {
        if(token){
            const user = await User.findOne({token : token});
            if(!user) return res.status(400).send('taru mo jo and complete token pass kar....')
            next()
        }
    })
}

module.exports = {VefiryUserWithToken}