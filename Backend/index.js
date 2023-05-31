const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
import userRoutes from "./routes/userRoutes";

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(err));

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
