const {getUser}=require("../service/auth");
function restrictedToLoginOnly(req,res,next){
    const userUid=req.cookies?.uid;
    if(!userUid) return res.status(401).redirect("/login");

    const user=getUser(userUid);
    if(!user) return res.status(401).redirect("/login");

    req.user=user;
    next();
};
module.exports={restrictedToLoginOnly};