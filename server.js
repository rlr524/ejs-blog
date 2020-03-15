require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const textFill = require("./data/content.json");
const mongoose = require("mongoose");

const aboutContent = textFill.aboutContent;

const app = express();

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-a5aew.mongodb.net/blogDB`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  }
);

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
  post.save(err => {
    if (!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

app.get("/posts/:postID", (req, res) => {
  const requestedPostId = req.params.postID;
  Post.findOne(
    {
      _id: requestedPostId
    },
    (err, post) => {
      res.render("post", {
        title: post.title,
        date: post.date,
        content: post.content
      });
    }
  );
});

app.get("/about", (req, res) => {
  res.render("about", {
    aboutPlaceholderText: aboutContent
  });
});

app.get("/contact", (req, res) => {
  let emailS = "emiyaconsulting.com";
  let emailA = "rob";
  res.render("contact", {
    emailC: emailA + "@" + emailS
  });
});

app.listen(process.env.PORT || 3000, () => {
  let port = process.env.PORT || 3000;
  console.log("Server is running on port " + port);
});
