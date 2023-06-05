const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;

// config ejs
app.set("view engine", "ejs");
require("dotenv").config();

// Custom Middleware
// app.use((req, res, next) => {
//   console.log("A request was just made");
//   console.log(req.method);
//   console.log(req.path);
//   next();
// });

app.use(express.static("public"));

mongoose
  .connect(process.env.DBURL)
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

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
