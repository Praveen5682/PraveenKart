const express = require("express");
const router = express.Router();

const controller = require("../controller/index");

router.post("/postComment", controller.postComment);
router.post("/getComments", controller.getComments);

module.exports = router;
