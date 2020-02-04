const express = require("express");
const bodyParser = require("body-parser");
const textFill = require("./data/content.json");
// const date = require(__dirname + "/src/getDay.js");
const mongoose = require("mongoose");

const homeStartingContent = textFill.fillContent;
const aboutContent = textFill.aboutContent;
const contactContent = textFill.contactContent;
// const composeDay = date();

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://blogservice:iGT6R8GQTmwZVhp@cluster0-a5aew.mongodb.net/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

const postSchema = {
  title: String,
  content: String,
  date: {
    type: Date,
    default: Date.now
  }
};

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
      });
    }
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save((err) => {
    if (!err) {
      res.redirect("/")
    } else {
      console.log(err);
    }
  });
});

app.get("/posts/:postID", (req, res) => {
  const requestedPostId = req.params.postID;
  Post.findOne({
    _id: requestedPostId
  }, (err, post) => {
    res.render("post", {
      title: post.title,
      content: post.content
    });
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

app.listen(process.env.PORT || 3000, () => {
  let port = process.env.PORT || 3000;
  console.log("Server is running on port " + port);
});