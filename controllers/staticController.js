const Students=require("../models/students");

async function getHome(req,res){
    const students=await Students.find({});

   return  res.render("Home",{students});
};
async function getEdit(req,res){
    const id=req.params.id;
   const student= await  Students.findById(id);
   return  res.render("edit",{student});
};
async function getAdd(req,res){
   return  res.render("add");
};

async function getLogin(req,res){
   return  res.render("login");
};async function getRegister(req,res){
   return  res.render("register");
};


module.exports={
    getHome,
    getAdd,
    getEdit,
    getLogin,
    getRegister
}