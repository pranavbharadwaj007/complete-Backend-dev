const express = require("express");

const app = express();
// middleware function
app.use(express.json());
app.listen(3000);

const authRouter = express.Router();
app.use("/auth", authRouter); // global middleware
//auth
authRouter
  .route("/signup")
  .get(middleware, getSignUp) // path specific middleware
  .post(postSignUp);

function middleware(req, res, next) {
  console.log("middleware encountered"); // middleware
  next();
}

function getSignUp(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
}
function postSignUp(req, res) {
  let obj = req.body;
  console.log("backend", obj);
  res.json({
    message: "user signedup",
    data: obj,
  });
}
