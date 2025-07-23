const express = require('express');
const {createAssignFor,getAssignForById,getAllAssignFor,deleteAssignFor,updateAssignFor} =require('../controller/assignFor');
const router = express.Router();

// CRUD routes
router.post("/", createAssignFor);
router.get("/", getAllAssignFor);
router.get("/:id", getAssignForById);
router.put("/:id", updateAssignFor);
router.delete("/:id", deleteAssignFor);

module.exports = router;
