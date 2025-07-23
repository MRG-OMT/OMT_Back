const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema(
  {
    memberReferenceNumber: String,  // Column A
    timestamp: String,              // Column B
    emailAddress: String,           // Column C (Google Form email)
    name: String,                   // Column D
    fathersName: String,            // Column E
    pointOfContact: String,         // Column F
    mobileNumber: String,           // Column G
    dateOfBirth: String,            // Column H
    collegeName: String,            // Column I
    department: String,             // Column J
    workingOrStudyingStatus: String,// Column K
    currentInstitutionOrCompany: String, // Column L
    profession: String,             // Column M
    maritalStatus: String,          // Column N
    otherPersonalNumber: String,    // Column O
    personalEmail: String,          // Column P
    photoUrl: String,               // Column Q (converted Google Drive direct link)
    areaOfInterest: String,         // Column R
    ambition: String,               // Column S
    expectationsFromSolidarity: String, // Column T
    currentAddress: String,         // Column U
    currentDistrict: String,        // Column V
    nativePlace: String,             // Column W
    resume:String,                    // Column X
    age:String,                      // Column AA
    memberId:String,                 // Column AB
    memberType:String,                // Column AE
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
