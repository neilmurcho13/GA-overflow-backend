import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 300 },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
      //required: true
    }
  },
  {
    timestamps: true
  }
)

const blogPostSchema = new mongoose.Schema({
  header: String,
  headerImgUrl: String,
  para1: { type: String, required: true },
  para2: String,
  para3: String,
  para4: String,
  para5: String,
  summary: String,
  bodyImgUrl: String,
  tags: [{ type: String }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema]
})

blogPostSchema.plugin(mongooseUniqueValidator)

const Blog = mongoose.model('Blog', blogPostSchema)

export default Blog
