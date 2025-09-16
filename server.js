   const express = require('express');
   const cors = require('cors');
   const http = require("http");    //for real sync data like chat app      
   const { Server } = require("socket.io"); //for real sync data like chat app
   const connectDB = require('./config/connectionDB');
   //const {bulkImport,bulkImportPlaces} = require("./utils/bulkImport");
   const cookieParser = require("cookie-parser");
   require('dotenv').config();

   const app = express();
   const PORT = process.env.PORT || 5000
   connectDB();

   app.use(express.json());
   app.use(cookieParser());
   app.use(cors(
    { //origin:'http://localhost:5173',
       origin: "https://omt-front.vercel.app",
       credentials: true }
  ));

   app.use(express.static("Public"));


   app.use("/member",require("./routes/member"));
   app.use("/project",require("./routes/project"));
   app.use("/task",require("./routes/task"));
   app.use("/subTask",require("./routes/subTask"));
   app.use("/assignFor",require("./routes/assignFor"));
   app.use("/request",require("./routes/statusChangeRequest"));
   app.use("/dropdown",require("./routes/dropdown"));
   app.use("/activityList",require("./routes/activity"))
   app.use("/auth", require("./routes/login"));
   app.use("/place",require("./routes/places"));
   app.use("/service",require("./routes/service"));

   // Its dummy API call for awake server 
   app.get('/health',(req,res)=>{
      res.status(200).json({status:'ok',timestamp:Date.now()});
   })

   // ✅ Create HTTP server & attach Socket.IO
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ['http://localhost:5173', 'https://omt-front.vercel.app'],
//     credentials: true
//   }
// });

// io.on("connection", (socket) => {
//   console.log("🔥 A user connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("❌ User disconnected:", socket.id);
//   });
// });

// // ✅ Export io so routes can use it
// module.exports = { app, server, io };

   
  app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  // For import member data from sheets to db
  // await bulkImport();
  // console.log("✅ Bulk import complete. Exiting...");
  // process.exit(0); // stop after import
  // For import Places data from sheets to db
   // await bulkImportPlaces();
   //  console.log("✅ Bulk import complete. Exiting...");
   //  process.exit(0); // stop after import
});


