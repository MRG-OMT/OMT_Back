const express = require('express');
const router=express.Router();
//const verifyToken = require("../middleware/auth");
const {login,logOut, check} = require("../controller/login");
const verifyToken = require('../middleware/auth');


router.post("/login",login);
router.post("/logout",logOut);
router.get("/check",verifyToken,check);

module.exports= router;