
const express = require("express");
const router = express.Router();
const {createTask,getAllTasks,getTaskById,updateTask,deleteTask} = require("../controller/task");

// CRUD routes
router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id",updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
