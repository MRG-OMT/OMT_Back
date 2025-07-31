const express = require("express");
const router = express.Router();
const {addDropdown, getDropdown} = require("../controller/dropdown");

router.get("/",getDropdown);
router.post("/",addDropdown);

module.exports = router;