const express = require("express");
const router = express.Router();
const {statusUpdatedByMember,getStatusRequest,statusApproved}= require("../controller/statusChangeRequest");
const verifyToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorize");

router.get('/status-requests',verifyToken,authorizeRoles,getStatusRequest); // get all requests for change the status
router.post('/status-requests/:id/action',verifyToken,authorizeRoles,statusApproved); // approved or reject by admin
router.post('/status-request',verifyToken,statusUpdatedByMember) //request made by member

module.exports=router