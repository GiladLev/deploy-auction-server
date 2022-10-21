const express = require("express");
const app = express();
const moongoose = require("mongoose");
const dotnev = require("dotenv");
var cors = require('cors')
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const prouductRoute= require("./routes/prouduct")

dotnev.config();

moongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection Successfull"))
  .catch((err) => console.log(err));

  app.use(cors())
  app.use(express.json())
  app.use("/api/auth", authRoute)
  app.use("/api/users", userRoute)
  app.use("/api/products", prouductRoute)

app.listen(process.env.PORT || 5000, () => {
  console.log(`server is running`);
});
