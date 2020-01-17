const express = require("express");
const bodyParser = require("body-parser");
const textFill = require("./data/content.json");
const date = require(__dirname + "/src/getDay.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const homeStartingContent = textFill.fillContent;
const aboutContent = textFill.aboutContent;
const contactContent = textFill.contactContent;
let posts = [];
const composeDay = date();

app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    postContent: posts
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
  const postObject = {
    day: composeDay,
    titleText: composeTitle,
    bodyText: composeText
  };
  let newPost = () => {
    posts.push(postObject);
  };
  newPost();
  res.redirect("/");
});

app.get("/post/:getpost", (req, res) => {
  const postURL = req.params.getpost;
  posts.forEach(function (post) {
    const savedTitle = post.titleText;
    if (postURL === savedTitle) {
      console.log("Match");
    }
  })
  res.redirect("/")
});

app.listen(process.env.PORT || 3000, () => {
  let port = process.env.PORT || 3000;
  console.log("Server is running on port " + port);
});