import Blog from '../models/blogPost.js'

export let createComment = async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  console.log('the id is', id)
  console.log('the blog is', blog)

  if (!blog) {
    return response.status(404).send({ message: 'Blog does not exist' })
  }
  const newComment = { ...request.body, createdBy: request.currentUser }
  try {
    blog.comments.push(newComment) // make changes to comments section
    const savedBlog = await blog.save() // MUST SAVE NEW MOVIE DATA
    return response.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
}
