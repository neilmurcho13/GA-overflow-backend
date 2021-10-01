import Blog from '../models/blogPost.js'
// import { removedAdded } from './helpers.js'

async function getAllBlogs(req, res, next) {
  try {
    const blog = await Blog.find()
    return res.status(200).json(blog)
  } catch (err) {
    next(err)
  }
}

async function getBlog(req, res, next) {
  const { id } = req.params

  try {
    const blog = await Blog.findById(id)

    if (!blog) {
      return res.status(404).send({ message: 'Blog does not exist' })
    }

    return res.status(200).json(blog)
  } catch (err) {
    next(err)
  }
}

async function createBlog(req, res, next) {
  try {
    const newBlog = await Blog.create({
      ...req.body
    })
    return res.status(201).json(newBlog)
  } catch (err) {
    next(err)
  }
}

async function updateBlog(req, res, next) {
  try {
    const { id } = req.params
    const { body } = req

    const blog = await Blog.findById(id)

    if (!blog) {
      return res.status(404).send({ message: 'Blog does not exist' })
    }

    blog.set(body)
    const savedBlog = await blog.save()

    res.status(200).json(savedBlog)
  } catch (err) {
    next(err)
  }
}

async function deleteBlog(req, res, next) {
  try {
    const { id } = req.params
    const blog = await Blog.findByIdAndDelete(id)

    if (!blog) {
      return res.status(404).send({ message: 'Blog does not exist' })
    }
    return res.status(200).json(blog)
  } catch (err) {
    next(err)
  }
}

export default {
  getAllBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog
}
