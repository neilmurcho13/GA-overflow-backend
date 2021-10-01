import Blog from '../models/blogPost.js'
import { blogPostSeedData } from './blogPostSeedData.js'
import { connectDb, disconnectDb, truncateDb } from './helpers.js'

async function seed() {
  try {
    await connectDb()
    console.log('🤖 Database Connected')

    await truncateDb()
    console.log('🤖 Database Dropped')

    const blogs = await Blog.create(blogPostSeedData)
    console.log(`🤖 ${blogs.length} Blog(s) added to the database`)

    console.log('🤖 Goodbye')
  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)
  }
  disconnectDb()
}

seed()
