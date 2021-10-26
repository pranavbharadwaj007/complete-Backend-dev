const express = require("express");
const userModel = require("../models/userModel");
const authRouter = express.Router();

authRouter
  .route("/signup")
  .get(middleware, getSignUp) // path specific middleware
  .post(postSignUp);

authRouter
.route('/login')
.post(loginUser)

function middleware(req, res, next) {
  console.log("middleware encountered"); // middleware
  next();
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

 async function loginUser(req,res){
    try{

    
    let data=req.body;
    if(data.email){
        let user=await userModel.findOne({email:data.email});
        if(user){
            if(user.password==data.password){
                res.cookie('isLoggedIn',true,{httpOnly:true});
                return res.json({
                    message:'user has logged in',
                    userDetails:data
                })
            }else{
                return res.json({
                    message:'wrong credentials'
                })
            }
        }else{
            return res.status(500).json({
                message:'user not found'
            })
        }
    }
    else{
        res.json({
            message:'enter email'
        })
    }

}
catch(err){
    return res.json({
        message:res.message
    })
}
}


module.exports=authRouter;