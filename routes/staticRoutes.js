const {getHome,getEdit,getAdd,getLogin,getRegister}=require("../controllers/staticController");
const express=require("express");
const router=express.Router();
const {restrictedToLoginOnly}=require("../middlewares/auth");

router.get("/",restrictedToLoginOnly,getHome);

router.get("/add",restrictedToLoginOnly,getAdd);

router.get("/edit/:id",restrictedToLoginOnly,getEdit);  

router.get("/login",getLogin);

router.get("/register",getRegister);



module.exports=router;


