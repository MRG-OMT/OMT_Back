const express = require('express');
const router=express.Router();
const {addProject,getProject,getProjectList,deleteProject,editProject} = require("../controller/project");
const verifyToken = require('../middleware/auth')
const authorizeRoles = require('../middleware/authorize')

router.get("/",getProjectList)  //Get all project
router.get("/:id",getProject)  //Get project by id
router.post('/',verifyToken, authorizeRoles('Admin'),addProject);    //add Project 
router.put("/:id",verifyToken, authorizeRoles('Admin'),editProject) //edit project
router.delete("/:id",verifyToken, authorizeRoles('Admin'),deleteProject) //delete project

module.exports=router
