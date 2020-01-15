const express = require("express");
const bodyParser = require("body-parser");
const textFill = require("./data/content.json");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent = textFill.fillContent;
const aboutContent = textFill.aboutContent;
const contactContent = textFill.contactContent;

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

app.post("/compose", (req, res) => {
  const composeText = req.body.composeText;
  const composeTitle = req.body.composeTitle;
  console.log(
    "The title is: " + composeTitle + " and the text is: " + composeText
  );
  res.redirect("/compose");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.listen(process.env.PORT || 3000, () => {
  let port = process.env.PORT || 3000;
  console.log("Server is running on port " + port);
});
