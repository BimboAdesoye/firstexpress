const express = require("express");
const app = express();
const PORT = 8080;

// config ejs
app.set("view engine", "ejs");

const trainees = [
  { name: "Christy", profession: "Front-end dev" },
  { name: "Ejiro", profession: "Back-end dev" },
  { name: "Henry", profession: "Mobile app dev" },
  { name: "John", profession: "Desktop dev" },
];

app.get("/", (req, res) => {
  res.status(200).render("index", { title: "EJS Home Page", trainees });
});

app.get("/about", (req, res) => {
  res.status(200).render("about", { title: "EJS About Page" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "EJS 404 Page" });
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
