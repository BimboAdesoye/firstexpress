const express = require("express");
const mongoose = require("mongoose");
const Trainees = require("./model/todoModel");

const app = express();
const port = process.env.PORT || 8080;

// config ejs
app.set("view engine", "ejs");
require("dotenv").config();

const db_url = process.env.DBURL;

// Custom Middleware
// app.use((req, res, next) => {
//   console.log("A request was just made");
//   console.log(req.method);
//   console.log(req.path);
//   next();
// });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(db_url)
  .then(() => {
    console.log("DB connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

// TESTING OUR MODEL AND DATABASE
// app.get("/add-trainee", async (req, res) => {
//   const TRAINEES = new Trainees({
//     name: "John",
//     profession: "Senior Desktop Developer",
//     description: "He's quite good at it",
//   });
//   TRAINEES.save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   try {
//     const savedTrainees = await TRAINEES.save();
//     res.send(savedTrainees);
//   } catch (err) {
//     console.log(err);
//   }
// });

// for getting all info from the DB
// app.get("/all-trainees", async (req, res) => {
//   try {
//     const allTrainees = await Trainees.find();
//     res.send(allTrainees);
//   } catch (err) {
//     console.log(err);
//   }
//   Trainees.find()
//     .then((results) => {
//       res.send(results);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// To get a single trainee
// app.get("/single-trainee", async (req, res) => {
//   try {
//     const singleTrainee = await Trainees.findById("647df29d0becac67b7a9d0b0");
//     res.send(singleTrainee);
//   } catch (err) {
//     console.log(err);
//   }
//   Trainees.findById("647df29d0becac67b7a9d0b0")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Routes
// const trainees = [
//   { name: "Christy", profession: "Front-end dev" },
//   { name: "Ejiro", profession: "Back-end dev" },
//   { name: "Henry", profession: "Mobile app dev" },
//   { name: "John", profession: "Desktop dev" },
// ];

app.get("/", (req, res) => {
  res.redirect("/todos");
});

app.get("/about", (req, res) => {
  res.status(200).render("about", { title: "EJS About Page" });
});

// todo routes
app.get("/todos", async (req, res) => {
  try {
    const allTrainees = await Trainees.find();
    res.render("index", { title: "EJS About Page", trainees: allTrainees });
  } catch (err) {
    console.log(err);
  }
});

app.post("/todos", (req, res) => {
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
});

app.get("/todo/create", (req, res) => {
  res.status(200).render("createList", { title: "EJS create-todo Page" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "EJS Error" });
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
