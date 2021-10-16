const express = require("express");
const mongoose= require("mongoose");

const app = express();
// middleware function
app.use(express.json());
app.listen(3000);

const db_link='mongodb+srv://<name>:<password>@cluster0.m8o2x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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

//model
const userModel=mongoose.model('userModel',userSchema);

(async function createUser(){
  let user={
    name:'pranav',
    email:"abc@gmail.com",
    password:"12345678",
    confirmPassword:"12345678"
  };
  let data=await userModel.create(user);
  console.log(data);
})();

