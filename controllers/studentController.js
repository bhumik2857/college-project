const Students=require("../models/studets");

async function addNewStudent(req,res){
    const body=req.body;
    if(!body)
        return res.status(400).redirect("add");
    try{
        await Students.create({
            ...body
        });

        console.log("new user added",body);
        return res.redirect("/");
    }
    catch(err){
        return res.status(400).redirect("/add");

    }
};
async function editStudent(req,res){
    const body=req.body;
    const id=req.params.id;
    const updatedStudent=await Students.findByIdAndUpdate(
        id,
        body,
        {new:true} // return updated student
    );

    if(!updatedStudent)
        {
             console.log("error in edit api");
             return res.status(404).redirect("/edit");
        } 

    console.log("students edited succesfuuly",updatedStudent);

    return res.redirect("/");

    
};
async function deleteStudent(req,res){
    const id=req.params.id;
   const deletedStudent=await Students.findByIdAndDelete(id,{new:true});

     if(!deletedStudent) {
        console.log("error in delte api");
        return res.status(404).redirect("/");
     }

    console.log("students deleted succesfuuly",deleteStudent);

    return res.redirect("/");
};



module.exports={
    addNewStudent,
    editStudent,
    deleteStudent
}