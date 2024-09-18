const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRoute = require('./routes/blogs');
const authRoute = require('./routes/auth');
require('dotenv').config();

const app = express();
//connect
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("เชื่อมต่อเรียบร้อย"))
  .catch(() => console.log("ERR"));

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use('/api',blogRoute)
app.use('/api',authRoute)

const port = process.env.PORT;
app.listen(port, () => console.log(`start server inport ${port}`));
