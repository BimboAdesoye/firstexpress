const Trainees = require("../model/todoModel");

const todos_All = async (req, res) => {
  try {
    const allTrainees = await Trainees.find();
    res.render("index", { title: "EJS About Page", trainees: allTrainees });
  } catch (err) {
    console.log(err);
  }
};

const todos_Create = (req, res) => {
  console.log(req.body);
  const savedTrainee = new Trainees(req.body);
  savedTrainee
    .save()
    .then((result) => {
      res.redirect("/todos");
    })
    .catch((err) => {
      console.log(err);
    });
};

const todos_singleTrainee = (req, res) => {
  const id = req.params.id;
  Trainees.findById(id).then((result) => {
    res.render("details", { trainees: result, title: "ejs details" });
  });
};

const todos_deleteTrainee = (req, res) => {
  const id = req.params.id;
  Trainees.findByIdAndDelete(id).then((result) => {
    res.redirect("/todos");
  });
};

module.exports = {
  todos_All,
  todos_Create,
  todos_singleTrainee,
  todos_deleteTrainee,
};
