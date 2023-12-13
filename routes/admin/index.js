const { register, login, verfyUser, sendOtp , verifyOtp , forgotPass} = require("../../controller/userController");

const adminRoute = require("express").Router();

adminRoute.post('/register', register)
adminRoute.post('/login', login)
adminRoute.post('/verifyUser', verfyUser)
adminRoute.post('/sendOtp', sendOtp)
adminRoute.post('/verifyOtp', verifyOtp)
adminRoute.post('/forgot-password', forgotPass)

module.exports = adminRoute;