const { demofunction } = require("../../controller/userController");

const adminRoute = require("express").Router();
demofunction
adminRoute.get('/getData', demofunction)

module.exports = adminRoute;