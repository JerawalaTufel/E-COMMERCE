const { register, login } = require("../../controller/userController");

const adminRoute = require("express").Router();

adminRoute.post('/register', register)
adminRoute.post('/login', login)

module.exports = adminRoute;