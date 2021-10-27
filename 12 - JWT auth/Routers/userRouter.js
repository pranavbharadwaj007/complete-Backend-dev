const express = require("express");
const userRouter = express.Router();
const userModel=require('../models/userModel')
const protectRoute=require('./authHelper')
userRouter
  .route("/") //   .../user/
  .get(protectRoute,getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);
userRouter.route("/:id").get(getUserById);

async function getUsers(req, res) {

    let allUsers=await userModel.find();
    //let user=await userModel.findOne({name:"pranav"});
  
    res.json({message:'list of all users',data:allUsers});
  }
  
  function postUser(req, res) {
   // console.log(req.body);
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
    // for (key in req.body) {
    //   users[key] = dataToBeUpdated;
    // }
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
  

  module.exports=userRouter;