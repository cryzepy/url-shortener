const express = require("express");
const urlRoutes = require("./routes/urlRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/", urlRoutes);

app.use(errorHandler);

module.exports = app;
