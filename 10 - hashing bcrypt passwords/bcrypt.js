const mongoose= require("mongoose");
const emailValidator=require("email-validator"); // email validator
const bcrypt=require('bcrypt');
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
    unique:true,
    validate:function(){
      return emailValidator.validate(this.email) // we have used external package to validate email
    }
  },
  password:{
    type:String,
    required:true,
    minLength:8

  },  
  confirmPassword:{
    type:String,
    required:true,
    minLength:8,
    validate:function(){
      return this.confirmPassword==this.password  //validator were we confirm password
    }

  }
});
// mongo hooks were we will delete confirm password as it is of no use
userSchema.pre('save',function(){
  console.log("before save in db",this);
  this.confirmPassword=undefined;
})

userSchema.pre('save',async function(){
    let salt=await bcrypt.genSalt();
    let hashedString=await bcrypt.hash(this.password,salt);
   this.password=hashedString;
})

// hooks called after saving our db
userSchema.post('save',function(doc){
  console.log("after save in db",doc);
})


//model
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;