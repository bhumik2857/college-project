const express=require("express");
const router=express.Router();
const {addNewStudent,editStudent,deleteStudent}=require("../controllers/studentController");

router.post("/add",addNewStudent);
router.patch("/edit/:id",editStudent);
router.delete("/:id",deleteStudent);
module.exports=router;