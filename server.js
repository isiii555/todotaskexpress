require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const SERVER_PORT = process.env.SERVER_PORT;
const CON_STR = process.env.CON_STR;
const todoRoutes = require("./routes/todoRoutes");

const app = express();

mongoose.connect(CON_STR)
.then(() => {
    console.log("Server connected to mongodb");
})
.catch((err) => {
    console.log("Server could not connect to mongodb");
});

app.use("/api/v1/todos",todoRoutes);

app.listen(SERVER_PORT,() => {
    console.log(`server started listening at port : ${SERVER_PORT}`);
});