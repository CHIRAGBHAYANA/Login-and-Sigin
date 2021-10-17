const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Imports Routes
const routesUrls = require("./routes/routes");
const postRoute = require("./routes/post");
const cors = require("cors");

dotenv.config();

// Connect to database
mongoose.connect(process.env.DATABASE_ACESS, { useNewUrlParser: true }, () =>
  console.log("DataBase connected")
);

app.use(express.json());
app.use(cors());
// Middleware
app.use("/app", routesUrls);
app.use("/app", postRoute);
app.listen(3000, () => console.log("server is running on port 3000"));
