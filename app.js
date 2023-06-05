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

mongoose
  .connect(db_url)
  .then(() => {
    console.log("DB connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

const trainees = [
  { name: "Christy", profession: "Front-end dev" },
  { name: "Ejiro", profession: "Back-end dev" },
  { name: "Henry", profession: "Mobile app dev" },
  { name: "John", profession: "Desktop dev" },
];

// TESTING OUR MODEL AND DATABASE
app.get("/add-trainee", (req, res) => {
  const TRAINEES = new Trainees({
    name: " Kruz",
    profession: "Senior Frontend Developer",
    description: "He's quite good at it",
  });
  TRAINEES.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
// Routes
app.get("/", (req, res) => {
  res.status(200).render("index", { title: "EJS Home Page", trainees });
});

app.get("/about", (req, res) => {
  res.status(200).render("about", { title: "EJS About Page" });
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
