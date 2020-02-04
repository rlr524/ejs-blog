const express = require("express");
const bodyParser = require("body-parser");
const textFill = require("./data/content.json");
// const date = require(__dirname + "/src/getDay.js");
// const _ = require("lodash");
const mongoose = require("mongoose");

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

const postsSchema = {
  composeTitle: String,
  composeText: String,
  date: {
    type: Date,
    default: Date.now
  }
};

const Post = mongoose.model("Post", postsSchema);

// const homeStartingContent = textFill.fillContent;
const aboutContent = textFill.aboutContent;
const contactContent = textFill.contactContent;
// const composeDay = date();

app.get("/", (req, res) => {
  Post.find({}, (err, foundPosts) => {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {
        bodyText: foundPosts
      })
    }
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
  const postObject = new Post({
    composeTitle: composeTitle,
    composeText: composeText,
  });
  postObject.save();
  console.log("Posted");
  res.redirect("/");
});

// app.get("/post/:getpost", (req, res) => {
//   const postURL = _.kebabCase(req.params.getpost);
//   posts.forEach(function (post) {
//     const storedTitle = _.kebabCase(post.titleText);
//     if (storedTitle === postURL) {
//       res.render("post", {
//         postPageTitle: post.titleText,
//         postPageDay: post.day,
//         postPageBody: post.bodyText
//       })
//     }
//   })
// });

app.listen(process.env.PORT || 3000, () => {
  let port = process.env.PORT || 3000;
  console.log("Server is running on port " + port);
});