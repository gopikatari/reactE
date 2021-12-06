const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv/config");

//cors
app.use(cors());
//app to receive formdata
app.use(express.json({ limit: "25mb" }));
//dotenv
const PORT = process.env.PORT || 5000;
//routeConfiguration

app.use("/api/users", require("./routers/userRouter"));
app.use("/api/products", require("./routers/productsRouter"));
app.use("/api/orders", require("./routers/ordersRouter"));
app.use("/api/payment", require("./routers/paymentRouter"));

//for local
// app.use("/", (request, response) => {
//   response.send("<h1>Welome to OnlineShoppint</h1>");
// });

//for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//connect to mongodb
mongoose
  .connect(process.env.MONGO_DB_CLOUD_URL, {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((response) => {
    console.log("Mongodb server started");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log("Server Started");
});
