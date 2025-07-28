const StatusChangeRequest = require("../models/StatusChangeRequest");

// POST /status-request
const statusUpdatedByMember= async (req, res) => {
  const { taskId, requestedStatus } = req.body;
  const userId = req.user.id; // from auth middleware

  const request = new StatusChangeRequest({
    taskId,
    requestedStatus,
    requestedBy: userId,
    status: 'pending',
  });

  await request.save();
  res.json({ message: 'Request submitted' });
}
//Get all pending requests (Admin only)
const getStatusRequest = async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

  const requests = await StatusChangeRequest.find({ status: 'pending' })
    .populate('taskId')
    .populate('requestedBy');

  res.json(requests);
}

//Approve or reject a request

const statusApproved= async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

  const { action } = req.body; // 'approve' or 'reject'
  const request = await StatusChangeRequest.findById(req.params.id).populate('taskId');

  if (!request) return res.status(404).json({ message: 'Request not found' });

  if (action === 'approve') {
    request.status = 'approved';
    request.taskId.status = request.requestedStatus;
    await request.taskId.save();
  } else if (action === 'reject') {
    request.status = 'rejected';
  }

  await request.save();
  res.json({ message: `Request ${action}d successfully` });
}

module.exports={statusUpdatedByMember,getStatusRequest,statusApproved}