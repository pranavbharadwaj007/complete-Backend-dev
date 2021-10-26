//let flag=false;
function protectRoute(req,res,next){
    console.log(req.cookies);
  if(req.cookies.isLoggedIn){
    next();
  }
  else{
      return res.json({
          message:"pls login operation not allowed"
      })
  }
}
module.exports=protectRoute;