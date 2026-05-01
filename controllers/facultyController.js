async function updateCGPA(req, res) {
  try {
    let { studentId, cgpa } = req.body;

    cgpa = Number(cgpa);

    if (!studentId || isNaN(cgpa)) {
      return res.send("Invalid data");
    }

    const updated = await Users.findByIdAndUpdate(
      studentId,
      { cgpa: cgpa },
      { new: true }   // 🔥 ensures DB returns updated value
    );

    console.log("CGPA UPDATED:", updated);

    return res.redirect("/faculty/dashboard");

  } catch (err) {
    console.log("CGPA ERROR:", err);
    return res.status(500).send("Error updating CGPA");
  }
}
