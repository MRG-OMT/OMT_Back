const express = require("express");
const {getAllMembers, getMemberById,updateMember,} = require("../controller/member");

const router = express.Router();

router.get("/", getAllMembers);       // GET all members
router.get("/:id", getMemberById);    // GET single member
router.put("/:id", updateMember);     // UPDATE member

module.exports = router;
