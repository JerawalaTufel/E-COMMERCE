const router = require("express").Router();
const adminRoute = require("./admin");
const apiRoute = require("./v1");

router.use(adminRoute)

router.use(apiRoute)

module.exports = router;