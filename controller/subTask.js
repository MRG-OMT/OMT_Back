const SubTask = require("../models/subTask");


// Helper to format ID like S00001
const generateCustomId = async () => {
  const lastSubTask = await SubTask.findOne({ customId: { $exists: true } })
    .sort({ createdAt: -1 }) // newest project first
    .select("customId");

  let newNumber = 1;
  if (lastSubTask && lastSubTask.customId) {
    const lastNumber = parseInt(lastSubTask.customId.replace("ST", ""));
    newNumber = lastNumber + 1;
  }

  return `ST${newNumber.toString().padStart(5, "0")}`;
};
// ✅ Create SubTask
const createSubTask = async (req, res) => {
  try {
    const { title, description, assignedTo, taskId, startDate, endDate, priority, status } = req.body;
    const customId = await generateCustomId();
    const newSubTask = new SubTask({
      customId,
      title,
      description,
      assignedTo,
      taskId,
      startDate,
      endDate,
      priority,
      status
    });

    const savedSubTask = await newSubTask.save();
    res.status(201).json({ success: true, message: "SubTask created successfully", data: savedSubTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create SubTask", error: error.message });
  }
};

// ✅ Get All SubTasks
const getAllSubTasks = async (req, res) => {
  try {
    const subTasks = await SubTask.find()
      .populate("assignedTo", "name email photoUrl")  // populate member info
      .populate({path:"taskId",select:"title projectId ",populate:{ path: 'projectId', select:'title'}})
    res.status(200).json({ success: true, data: subTasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch SubTasks", error: error.message });
  }
};

// ✅ Get Single SubTask by ID
const getSubTaskById = async (req, res) => {
  try {
    const subTask = await SubTask.findById(req.params.id)
      .populate("assignedTo", "name email photoUrl ")
      .populate({path:"taskId",select:"title projectId ",populate:{ path: 'projectId', select:'title'}})

    if (!subTask) {
      return res.status(404).json({ success: false, message: "SubTask not found" });
    }

    res.status(200).json({ success: true, data: subTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch SubTask", error: error.message });
  }
};

// ✅ Update SubTask
const updateSubTask = async (req, res) => {
  try {
    const updatedSubTask = await SubTask.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedSubTask) {
      return res.status(404).json({ success: false, message: "SubTask not found" });
    }

    res.status(200).json({ success: true, message: "SubTask updated successfully", data: updatedSubTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update SubTask", error: error.message });
  }
};

// ✅ Delete SubTask
const deleteSubTask = async (req, res) => {
  try {
    const deletedSubTask = await SubTask.findByIdAndDelete(req.params.id);

    if (!deletedSubTask) {
      return res.status(404).json({ success: false, message: "SubTask not found" });
    }

    res.status(200).json({ success: true, message: "SubTask deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete SubTask", error: error.message });
  }
};


module.exports={createSubTask,getAllSubTasks,getSubTaskById,updateSubTask,deleteSubTask}