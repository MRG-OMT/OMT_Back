const Member = require("../models/member");

//  Get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "Server error fetching members" });
  }
};

//  Get a single member by ID
const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(member);
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ message: "Server error fetching member" });
  }
};

// ✅ Update member by ID
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedMember = await Member.findByIdAndUpdate(id, updatedData, {
      new: true, // returns updated document
      runValidators: true, // applies schema validations
    });

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ message: "Server error updating member" });
  }
};

module.exports={getAllMembers,getMemberById,updateMember}