const { User } = require("../models/user");
const { otpGenerate } = require("../services/custom");
const {validateRegisterUser ,validateLoginUser} = require("../services/validation")



const register = (req, res) => {
    const reqParam = req.body;
    validateRegisterUser(reqParam, res, async (validate) => {
        if(validate){
            const user = await User.findOne({email : reqParam.email})     
            if(user) return res.status(400).send('user is already exist')
            const otp = otpGenerate();
            reqParam.otp = otp;
            const newUser = await User.create(reqParam);                                                                                                                              
            res.status(201).send(newUser)
        }
    })
}

const login = (req , res) => {
    const reqParam = req.body;
    validateLoginUser(reqParam , res , async (validate) =>{
        if(validate) {
            const user = await User.findOne({email : reqParam.email})
            if(!user) {
                return res.status(400).send('user not exist please register')
            }
            if(!user.status){
                return res.status(400).send('Please verify your account')
            }
            res.status(201).send(user)

        }
    })
}

const verfyUser = async (req , res) => {
    const reqParam = req.body;
    const user = await User.findOne({otp : reqParam.otp})

    if(!user) {
        return res.status(400).send('wrong otp!!!!')
    }
    try {
        const verifyAccount = await  User.updateOne({
            otp : reqParam.otp
        },
        {
            $set : {
                status : 1,
                otp : null
            }
        })    
        if(verifyAccount.modifiedCount){
            return res.status(200).send('your account verify please login')
        } {
            return res.status(400).send('something went wrong!!!!')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register ,
    login ,
    verfyUser
}