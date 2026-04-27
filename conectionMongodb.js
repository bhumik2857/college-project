const mongoose=require("mongoose");

function connection(url){
    mongoose.connect(url).then(()=>{
        console.log("databse connected");
    })
    .catch((err)=>{
        console.log("databse not connected ",err);
    });
};

module.exports=connection;