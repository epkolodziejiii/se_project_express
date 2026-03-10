const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index.js");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })

  .catch((e) => console.error(e));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "69aa12ec851524a95f4e9749", // paste the _id of the test user created in the previous step
  };
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
