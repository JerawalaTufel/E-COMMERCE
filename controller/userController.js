const { User } = require("../models/user")
const {validateRegisterUser ,validateLoginUser} = require("../services/validation")



const register = (req, res) => {
    const reqParam = req.body;
    validateRegisterUser(reqParam, res, async (validate) => {
        if(validate){
            const user = await User.findOne({email : reqParam.email})     
            if(user) return res.status(400).send('user is already exist')
            const newUser = await User.create(req.body);
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
            console.log(user.status);
            res.status(201).send(user)

        }
    })
}

module.exports = {
    register ,
    login
}