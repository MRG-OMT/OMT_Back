const express = require("express");
const {getAllMembers, getMemberById,updateMember,deleteMember,addMember} = require("../controller/member");

const router = express.Router();

router.get("/", getAllMembers);       // GET all members
router.get("/:id", getMemberById);    // GET single member
router.post('/',addMember);    //add Member from sheet
router.put("/:id", updateMember);     // UPDATE member
router.delete("/:id",deleteMember) //delete Member

module.exports = router;
