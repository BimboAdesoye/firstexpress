const express = require("express");
const router = express.Router();
const Trainees = require("../model/todoModel");
const todosController = require("../controllers/todosController");

router.use(express.urlencoded({ extended: true }));

router.get("/", todosController.todos_All);

router.post("/", todosController.todos_Create);

// getting specific item using params
router.get("/specific/:id", todosController.todos_singleTrainee);

// deleting a specific item
router.get("/delete/:id", todosController.todos_deleteTrainee);

// Editing a specific item
router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  Trainees.findByIdAndUpdate(id, updatedData, { new: true })
    .then((result) => {
      res.redirect("/todos");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Trainees.findById(id).then((result) => {
    res.render("editList", { trainees: result, title: "EJS Edit-List Page" });
  });
});

router.get("/create", (req, res) => {
  res.status(200).render("createList", { title: "EJS create-todo Page" });
});

module.exports = router;
