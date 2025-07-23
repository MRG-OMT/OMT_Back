const { google } = require("googleapis");
const auth = require("../config/googleAuth");
const Member = require("../models/member");
require("dotenv").config();
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE = process.env.GOOGLE_SHEET_RANGE; 
// e.g., 'Members Database!A2:W' (covers all 23 columns)

const bulkImport = async () => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = res.data.values;
    if (!rows.length) {
      console.log("⚠️ No data found in Google Sheet.");
      return;
    }

    const members = rows.map(row => {
      const [
        memberReferenceNumber, // A
        timestamp,             // B
        emailAddress,          // C
        name,                  // D
        fathersName,           // E
        pointOfContact,        // F
        mobileNumber,          // G
        dateOfBirth,           // H
        collegeName,           // I
        department,            // J
        workingOrStudyingStatus, // K
        currentInstitutionOrCompany, // L
        profession,            // M
        maritalStatus,         // N
        otherPersonalNumber,   // O
        personalEmail,         // P
        photoUrl,              // Q
        areaOfInterest,        // R
        ambition,              // S
        expectationsFromSolidarity, // T
        currentAddress,        // U
        currentDistrict,       // V
        nativePlace,           // W
        resume,                //X
        ,                      //Y
        ,                       //Z
        age,                    //AA
        memberId,               //AB
        ,                       //AC
        ,                        //AD
        memberType             //AE
      ] = row;

      // ✅ Convert Google Drive URL to viewable link
      let formattedPhotoUrl = photoUrl;
      if (photoUrl && photoUrl.includes("drive.google.com")) {
        const match = photoUrl.match(/[-\w]{25,}/);
        formattedPhotoUrl = match ? `https://drive.google.com/uc?id=${match[0]}` : "";
      }

      return {
        memberReferenceNumber,
        timestamp,
        emailAddress,
        name,
        fathersName,
        pointOfContact,
        mobileNumber,
        dateOfBirth,
        collegeName,
        department,
        workingOrStudyingStatus,
        currentInstitutionOrCompany,
        profession,
        maritalStatus,
        otherPersonalNumber,
        personalEmail,
        photoUrl: formattedPhotoUrl,
        areaOfInterest,
        ambition,
        expectationsFromSolidarity,
        currentAddress,
        currentDistrict,
        nativePlace,
        resume,
        age,
        memberId,
        memberType
      };
    });

    await Member.deleteMany(); // Clears old data (optional)
    await Member.insertMany(members);

    console.log(`✅ Successfully imported ${members.length} members into MongoDB`);
  } catch (err) {
    console.error("❌ Bulk Import Error:", err);
  }
};

module.exports = bulkImport;
