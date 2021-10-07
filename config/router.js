import express from "express";
import blogPostController from "../controllers/blogPostController.js";
import userController from "../controllers/userController.js";

const Router = express.Router();

//* blogs
Router.route("/blogs")
  .get(blogPostController.getAllBlogs)
  .post(blogPostController.createBlog);

Router.route("/blogs/:id")
  .get(blogPostController.getBlog)
  .put(blogPostController.updateBlog)
  .delete(blogPostController.deleteBlog);

Router.route("/search").get(blogPostController.searchBlogs);

//* user
Router.route("/register").post(userController.registerUser);

Router.route("/login").post(userController.loginUser);

export default Router;
