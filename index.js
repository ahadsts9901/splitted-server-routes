const express = require("express");         // import 
const mongoose = require("mongoose");
const app = express();                      // initialize
const cors = require("cors");
const router = require("./routes/route");
const PORT = '5000';

mongoose.connect(process.env.MONGO_URI)
    .then((res) => console.log("Mongo DB Connect !"))
    .catch((err) => console.log("Internal Server Error"))

app.use(cors())
// body parser
app.use(express.json());

app.use("/api", router)

app.listen(PORT, () => console.log(`server is running on localhost:${PORT}`))