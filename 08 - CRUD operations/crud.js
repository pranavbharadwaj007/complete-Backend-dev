const express = require("express");
const mongoose= require("mongoose");

const app = express();
// middleware function
app.use(express.json());
app.listen(3000);
let users = [];

const userRouter = express.Router();
app.use("/user", userRouter);

// mini app whose base route is /user
userRouter
  .route("/") //   .../user/
  .get(getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);
userRouter.route("/:id").get(getUserById);


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

async function getUsers(req, res) {
  let allUsers=await userModel.find();
  res.json({message:'list of all users',data:allUsers});
}

function postUser(req, res) {
  console.log(req.body);
  users = req.body;
  res.json({
    message: "data received successfully",
    user: req.body,
  });
}
async function updateUser(req, res) {
  console.log("req.body ->",req.body);
  let dataToBeUpdated = req.body;
  let user=await userModel.findOneAndUpdate('abc@gmail.com',dataToBeUpdated)
  res.json({
    message: "data updated successfully",
  });
}

async function deleteUser(req, res) {
  let dataToBeDeleted=req.body
  console.log("delete -> ",dataToBeDeleted);
  let user=await userModel.findOneAndDelete(dataToBeDeleted);
  res.json({
    message: "data has been deleted",
    data:user
  });
}

function getUserById(req, res) {
  res.send("user id is", req.params);
  console.log(req.params.id);
}

function getSignUp(req, res) {

  res.sendFile("/public/index.html", { root: __dirname });
}
 async function postSignUp(req, res) {
  let dataObj=req.body;
  let user=await userModel.create(dataObj);
  console.log("backend", user);
  res.json({
    message: "user signedup",
    data: user,
  });
}
const db_link='mongodb+srv://<NAME>:<PASSWORD>@cluster0.m8o2x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
  console.log('db connected');
  //console.log(db);
})
.catch(function (err){
  console.log(err);
})

const userSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minLength:8

  },  
  confirmPassword:{
    type:String,
    required:true,
    minLength:8

  }
})


const userModel=mongoose.model('userModel',userSchema);



