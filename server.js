   const express = require('express');
   const cors = require('cors');
   const connectDB = require('./config/connectionDB');
   const bulkImport = require("./utils/bulkImport");
   const cookieParser = require("cookie-parser");
   require('dotenv').config();

   const app = express();
   const PORT = process.env.PORT || 5000
   connectDB();

   app.use(express.json());
   app.use(cookieParser());
   app.use(cors(
    { origin: "https://omt-front.vercel.app", credentials: true }
  ));

   app.use(express.static("Public"));


   app.use("/member",require("./routes/member"));
   app.use("/project",require("./routes/project"));
   app.use("/task",require("./routes/task"));
   app.use("/subTask",require("./routes/subTask"));
   app.use("/assignFor",require("./routes/assignFor"));
   app.use("/request",require("./routes/statusChangeRequest"))

   app.use("/auth", require("./routes/login"));
  app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  // For import member data from sheets to db
  // await bulkImport();
  // console.log("✅ Bulk import complete. Exiting...");
  // process.exit(0); // stop after import
});


