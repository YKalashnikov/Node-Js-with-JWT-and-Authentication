const express = require("express");
const app = express();
const dontenv = require('dotenv');
const mongoose = require("mongoose");

dontenv.config();

//Mongoose
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => console.log("Connected to DB :)")
);

//Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
app.use(express.json())

app.use("/api/user", authRoute);
app.use("/api", postRoute);


const PORT = 3000;
app.listen(PORT, () => console.log(`Running on the port ${PORT}`));
