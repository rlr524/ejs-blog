const express = require("express");
const bodyParser = require("body-parser");
const textFill = require("./data/content.json");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent = textFill.fillContent;
const aboutContent = textFill.fillContent;
const contactContent = textFill.fillContent;

app.get("/", (req, res) => {
  res.render("home", {
    homePlaceholderText: homeStartingContent
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    aboutPlaceholderText: aboutContent
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactPlaceholderText: contactContent
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.listen(process.env.PORT || 3000, () => {
  let port = process.env.PORT || 3000;
  console.log("Server is running on port " + port);
});
