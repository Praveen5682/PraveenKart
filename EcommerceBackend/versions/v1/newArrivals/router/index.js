const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const upload = require("../../../../middleware/multer");

router.post("/getnewarrivalsproduct", controller.getNewArrivalsProduct);

module.exports = router;
