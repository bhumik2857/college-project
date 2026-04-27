const jwt =require("jsonwebtoken");

function setUser(user){
    return jwt.sign(
        {
            _id:user._id,
            email:user.email
        },process.env.JWT_SECRET_KEY,
        {expiresIn:"1h"}
    )
};

function getUser(token)
{
    if(!token){
        return null;
    }
    return jwt.verify(token,process.env.JWT_SECRET_KEY);
}

module.exports={
    getUser,
    setUser
}