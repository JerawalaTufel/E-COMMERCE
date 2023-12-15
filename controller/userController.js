const { User } = require("../models/user");
const { otpGenerate } = require("../services/custom");
const {validateRegisterUser ,validateLoginUser} = require("../services/validation")
const bcrypt = require('bcrypt');

const register = (req, res) => {
    const reqParam = req.body;
    validateRegisterUser(reqParam, res, async (validate) => {
        if(validate){
            const user = await User.findOne({email : reqParam.email , number : reqParam.number})
            if(user) return res.status(400).send('user is already exist')
            const salt = await bcrypt.genSalt(parseInt(process.env.saltRounds));    
            const hashedPassword = await bcrypt.hash(reqParam.password, salt);
            reqParam.password = hashedPassword;

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
            const user = await User.findOne({email : reqParam.email })
            if(!user) {
                return res.status(400).send('user not exist please register')
            }
            if(!user.status){
                return res.status(400).send('Please verify your account')
            }
            const passwordMatch = await bcrypt.compare(reqParam.password, user.password);
            if(passwordMatch){
                res.status(201).send(user)
            } else {
                return res.status(400).send('wrong password')
            }
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

const sendOtp = async (req , res) => {
    const reqParam = req.body;
    const user = await User.findOne({email: reqParam.email});
    if(!user){
        return res.status(400).send('user not found');
    }   
    const otp = otpGenerate();
    const UpdateOtp = await User.updateOne({
        email: reqParam.email
    },{
        $set : {
            otp :otp
        }
    })
    if(UpdateOtp.modifiedCount){
        return res.status(200).send({
            'otp' : otp
        })
    } else {
        return res.status(400).send('something went wrong!!!!')

    }
}

const verifyOtp = async (req , res) => {
    const reqParam = req.body;
    const user = await User.findOne({otp: reqParam.otp});
    if(!user){
        return res.status(400).send('user not found');
    }
    return res.status(200).send('user found');
}

const forgotPass = async (req ,res) => {
    const reqParam = req.body;
    const user = await User.findOne({email: reqParam.email});
    if(!user){
        return res.status(400).send('user not found');
    }
    if(user.password == reqParam.password){
        return res.status(400).send('try with new password');
    }   
    const UpdateOtp = await User.updateOne({
        email: reqParam.email
    },{
        $set : {
            otp :null,
            password : reqParam.password
        }
    })
    if(UpdateOtp.modifiedCount){
    
    }
    if(constUpdateOtp.modifiedCount){
        return res.status(200).send('password updated')

    } else {
        return res.status(400).send('something went wrong!!!!')

    }

}
module.exports = {
    register ,
    login ,
    verfyUser ,
    sendOtp , 
    verifyOtp ,
    forgotPass
}