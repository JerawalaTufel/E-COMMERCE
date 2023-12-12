const { register, login, verfyUser } = require("../../controller/userController");

const adminRoute = require("express").Router();

adminRoute.post('/register', register)
adminRoute.post('/login', login)
adminRoute.post('/verifyUser', verfyUser)

module.exports = adminRoute;