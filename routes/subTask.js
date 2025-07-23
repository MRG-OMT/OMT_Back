const express = require("express");
const router = express.Router();
const {createSubTask,getAllSubTasks,getSubTaskById,updateSubTask,deleteSubTask}= require("../controller/subTask");

// CRUD routes
router.post("/", createSubTask);
router.get("/", getAllSubTasks);
router.get("/:id", getSubTaskById);
router.put("/:id", updateSubTask);
router.delete("/:id", deleteSubTask);

module.exports = router;
