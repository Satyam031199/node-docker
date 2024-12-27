const Post = require("../models/post.model");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res
      .status(200)
      .json({ status: "success", data: posts, results: posts.length });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ status: "success", data: post });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ status: "success", data: post });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ status: "success", data: post });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.deletePost = async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: "success", data: null });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
}