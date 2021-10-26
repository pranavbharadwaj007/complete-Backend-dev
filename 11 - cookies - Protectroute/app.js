const express = require("express");
const app = express();
const cookies = require("cookie-parser");

app.use(cookies());
// middleware function
app.use(express.json());
app.listen(3000);
const userRouter = require('./Routers/userRouter');
app.use("/user", userRouter);
const authRouter = require('./Routers/authRouter');
app.use("/auth", authRouter);  // global middleware
//auth




