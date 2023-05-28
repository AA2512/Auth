const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Post = mongoose.model("posts");

router.get("/create/new", (req, res) => {
  res.render("create-post");
});

router.post("/create/new", async (req, res) => {
  // console.log(req.body);
  const { title, description } = req.body;

  const post = await Post.create({
    title: title,
    description: description,
  });

  res.send(post);
});

module.exports = router;
