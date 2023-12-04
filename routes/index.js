const router = require("express").Router();
const adminRoute = require("./admin");

router.use(adminRoute)

module.exports = router;