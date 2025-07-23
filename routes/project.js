const express = require('express');
const router=express.Router();
const {addProject,getProject,getProjectList,deleteProject,editProject} = require("../controller/project");

router.get("/",getProjectList)  //Get all project
router.get("/:id",getProject)  //Get project by id
router.post('/',addProject);    //add Project 
router.put("/:id",editProject) //edit project
router.delete("/:id",deleteProject) //delete project

module.exports=router
