import { blog, blogs, blogsWithCategory, blogWithSlug, createBlog, deleteBlog, updateBlog } from "./blogs"
import { createTag, deleteTag, tag, tags, updateTag } from "./tags"

const resolvers = {
  Query: {
    tags,
    tag,
    blogs,
    blogWithSlug,
    blogsWithCategory,
  },
  Mutation: {
    createBlog,
    updateBlog,
    deleteBlog,
    createTag,
    updateTag,
    deleteTag
  }
}

module.exports = resolvers