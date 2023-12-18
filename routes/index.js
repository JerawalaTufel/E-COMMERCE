const router = require("express").Router();
const { VefiryUserWithToken } = require("../middleware/adminAuth");
const adminRoute = require("./admin");
const apiRoute = require("./v1");

router.use(adminRoute)

router.use(VefiryUserWithToken)
router.use(apiRoute)

module.exports = router;