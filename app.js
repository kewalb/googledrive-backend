// imports.
const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const connecctDB = require("./config/db");
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 9000; //initialising port.

// configure environment variables
env.config();
// connecting to database
connecctDB();
//middlewares.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/user", require('./routes/userAuth'))
app.use("/api", require("./routes/upload"))
app.use("/api", require("./routes/download"))
app.use('/dashboard', require("./routes/dashboard"))

app.listen(PORT, () => {
    console.log(`Server running at port:${PORT}`);
  });