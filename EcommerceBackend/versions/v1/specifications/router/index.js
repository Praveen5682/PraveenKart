const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.post("/createspecification", controller.createSpecification);
router.post("/getspecification", controller.getSpecification);
router.post("/editspecification", controller.editSpecification);
router.post("/deletespecification", controller.deleteSpecification);

module.exports = router;
