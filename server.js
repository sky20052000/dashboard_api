const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
//const port  = process.env.PORT || 6001;
const app = express();





// import  routes
const authRoutes = require("./routes/auth");
const verifyToken = require("./routes/validate-token");
const dashboardRoutes = require("./routes/dashboard");

// config
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// routes middleware
app.use("/api/user",authRoutes);

// this is proctected routes
app.use("/api/dashboard", verifyToken, dashboardRoutes);

// database connection

mongoose.connect("mongodb://localhost:27017/authApi").then((data)=>{
    console.log("server connected to the db");
}).catch((err)=>{
    console.log("No connection");
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on the 6001`);
})