import express from 'express'
import blogPostController from '../controllers/blogPostController.js'
import { createComment } from '../controllers/commentsController.js'
import userController from '../controllers/userController.js'
import secureRoute from '../middleware/secureRoute.js'
import User from '../models/user.js'

const Router = express.Router()

//* blogs
Router.route('/blogs')
  .get(blogPostController.getAllBlogs)
  .post(blogPostController.createBlog)

Router.route('/blogs/:id')
  .get(blogPostController.getBlog)
  .put(blogPostController.updateBlog)
  .delete(blogPostController.deleteBlog)

Router.route('/search').get(blogPostController.searchBlogs)

//* comments
Router.route('/blogs/:id/comments').post(createComment)

//* user
Router.route('/register').post(userController.registerUser)

Router.route('/login').post(userController.loginUser)

Router.route('/users').get(userController.getUser)

Router.route('/user').get(secureRoute, userController.getProfile)

export default Router
